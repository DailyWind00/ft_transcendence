from websockets.asyncio.server import serve
import asyncio
import math

#Timing related constants
SERVER_TICK_DELAY      = 0.016	#in milliseconds
SERVER_TICK_PER_SECOND = 60

class MessageType:
	START   = 1
	END     = 2
	IN_GAME = 3
	SCORE   = 4

class Timer:
	def __init__(self, time = 1):
		self.tick = time * SERVER_TICK_PER_SECOND
	
	def reset(self, time = 1):
		self.tick = time * SERVER_TICK_PER_SECOND
	
	def unset(self):
		self.tick = 0
	
	def update(self):
		if self.tick > 0:
			self.tick -= 1
	
	def getRemaningTime(self):
		return self.tick / SERVER_TICK_PER_SECOND

class Point:
	def __init__(self, x = 0, y = 0):
		self.x = x
		self.y = y

	def add(self, p):
		self.x += p.x
		self.y += p.y

	def sub(self, p):
		self.x -= p.x
		self.y -= p.y
	
	def mult(self, p):
		self.x *= p.x
		self.y *= p.y
	
	def div(self, p):
		self.x /= p.x
		self.y /= p.y
	
	def dist(self, p):
		return math.sqrt(pow(p.x - self.x, 2) + pow(p.y - self.y, 2))

class Rectangle:
	def __init__(self, x, y, width, height):
		self.position = Point(x, y)
		self.width = width
		self.height = height
	
	def checkCircleCollision(self, ball):
		nearX = ball.position.x - max(self.position.x, min(ball.position.x, self.position.x + self.width))
		nearY = ball.position.y - max(self.position.y, min(ball.position.y, self.position.y + self.height))

		if (nearX * nearX) + (nearY * nearY) < (ball.radius * ball.radius):
			return True
		return False

class Player:
	def __init__(self, webSocket, playerNum, name = "john-doe"):
		self.webSocket = webSocket
		self.num = playerNum
		self.name = name
		self.score = 0
		if self.num == 1:
			xOff = -28.25
		elif self.num == 2:
			xOff = 28.25
		self.hitbox = Rectangle(xOff, -1.75, 0.5, 3.5)
		self.center = Point(int(xOff), 0)

	def update(self):
		self.hitbox.position.y = self.center.y - 1.75

	async def send(self, message):
		await self.webSocket.send(message)

class Ball:
	def __init__(self, x, y, radius = 0):
		self.position = Point(x, y)
		self.radius = radius
		self.speed = Point(0.2, 0)

class Game:
	def __init__(self):
		self.connectionNumber = 0
		self.players = list()
		self.ball = Ball(0, 0, 0.5)
		self.timer = Timer(1)

	def getPlayerFromSocket(self, webSocket):
		for player in self.players:
			if webSocket == player.webSocket:
				return player
		return None

	async def listen(self):
		#listening for pending connection
		async with serve(self.socketHandler, "0.0.0.0", 8001):
			await asyncio.get_running_loop().create_future()

	def composeStartMessage(self):
		# Indicate the start of the game
		#
		# Give controle to players
		# Server will start to send "In Game Message". Client must listen to them
		#
		# byte 1: <message-type>

		message = chr(MessageType.START)

		return (message, message)
	
	def composeEndMessage(self):
		# Indicate the end of a match
		#
		# Remove controle from client
		# Client will stop listening for "In Game Message"
		#
		# byte 1: <message-type>

		message = chr(MessageType.END)

		return (message, message)
	
	def composeInGameMessage(self):
		# Indicate the new state of elements in the game
		#
		# Update opposite player position on client-side
		# Update ball velocity on client-side
		#
		# byte 1: <message-type> | byte 2<->3: <opposite-player-position> | byte 4<->5: <ball-x-velocity> | byte 6<->7: <ball-y-velocity>
		
		player1 = self.players[0]
		player2 = self.players[1]
		ball = self.ball

		#for player one
		message1 = chr(MessageType.IN_GAME)
		message1 += chr(int(player2.center.y) + 128)
		message1 += chr(int(10 * (player2.center.y - int(player2.center.y)) + 128))
		message1 += chr(int(ball.speed.x) + 128)
		message1 += chr(int(10 * (ball.speed.x - int(ball.speed.x)) + 128))
		message1 += chr(int(ball.speed.y) + 128)
		message1 += chr(int(10 * (ball.speed.y - int(ball.speed.y)) + 128))

		#for player two
		message2 = chr(MessageType.IN_GAME)
		message2 += chr(int(player1.center.y) + 128)
		message2 += chr(int(10 * (player1.center.y - int(player1.center.y)) + 128))
		message2 += chr(int(ball.speed.x) + 128)
		message2 += chr(int(10 * (ball.speed.x - int(ball.speed.x)) + 128))
		message2 += chr(int(ball.speed.y) + 128)
		message2 += chr(int(10 * (ball.speed.y - int(ball.speed.y)) + 128))

		return (message1, message2)

	def composeScoreMessage(self):
		# Indicate that a point as been taken
		#
		# Add one point to <scoring-player-ID>
		# Reset both player positions
		# reset ball position and velocity
		#
		# byte 1: <message-type> | byte 2: <scoring-player-ID>

		message = chr(MessageType.SCORE)
		message += chr(1)	#implementer system de score

	async def sendGameInfo(self, message_type):
		
		message = None

		match message_type:
			case MessageType.START:
				message = self.composeStartMessage()
			case MessageType.END:
				message = self.composeEndMessage()
			case MessageType.IN_GAME:
				message = self.composeInGameMessage()
			case MessageType.SCORE:
				message = self.composeScoreMessage()

		await self.players[0].send(message[0])
		await self.players[1].send(message[1])

	async def socketHandler(self, webSocket):
		#Update number of connection and add player to list
		self.connectionNumber += 1
		self.players.append(Player(webSocket, self.connectionNumber))
	
		#Identify client on client-side
		await webSocket.send(chr(self.connectionNumber))

		#Launch game loop
		if self.connectionNumber == 2:
			asyncio.create_task(self.run())
		
		while True:
			#get info sent by the clients
			message = await webSocket.recv()
			
			#get player position
			player = self.getPlayerFromSocket(webSocket)
			if player is None:
				continue
			player.center.y = ord(message[0]) - 128
			player.center.y += (ord(message[1]) - 128) / 10

	async def run(self):
		await self.sendGameInfo()

		while True:
			#keep server to a fixed tick rate
			await asyncio.sleep(SERVER_TICK_DELAY)	

			#bounce ball on the up and down walls
			if abs(self.ball.position.y) >= 12.5:
				self.ball.speed.y *= -1

			#update both players and check for collisions with the ball
			for player in self.players:
				player.update()
				if player.hitbox.checkCircleCollision(self.ball):
					if self.ball.position.y < player.center.y:
						self.ball.speed.y = -0.1
					if self.ball.position.y > player.center.y:
						self.ball.speed.y = 0.1
					self.ball.speed.x *= -1

			#update ball position
			self.ball.position.add(self.ball.speed)

			#send up-to-date info to both clients
			await self.sendGameInfo()

if __name__ == "__main__":
	game = Game()

	asyncio.run(game.listen())
