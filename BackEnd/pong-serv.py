from websockets.server import serve
import asyncio
import math
import ssl
import pathlib

#Timing related constants
SERVER_TICK_DELAY      = 0.016	#in milliseconds
SERVER_TICK_PER_SECOND = 60

SERVER_PORT = 2500
SERVER_IP   = "0.0.0.0"

async def calcon(time):
	await asyncio.sleep(time)

class MessageType:
	ID          = 0
	START       = 1
	END         = 2
	IN_GAME     = 3
	SCORE       = 4
	RESTART     = 5
	MATCHID_REQ = 6

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

class Match:
	def __init__(self, matchID):
		self.connectionNumber = 0
		self.ID = matchID
		self.players = list()
		self.ball = Ball(0, 0, 0.5)
		self.timer = Timer(1)
		self.over = False
	
	def getPlayerFromSocket(self, webSocket):
		for player in self.players:
			if webSocket == player.webSocket:
				return player
		return None

	async def identificationMessage(self, websocket, ID):
		# Give the player his ID
		#
		# byte 1: <message-type> | byte 2: <player-ID>

		await websocket.send(chr(MessageType.ID) + chr(ID))

	async def startMessage(self, StartDuration):
		# Indicate the start of the game
		#
		# Give controle to players
		# Server will start to send "In Game Message". Client must listen to them
		#
		# byte 1: <message-type> | byte 2: <remaining-time-in-second>

		for i in range(StartDuration, -1, -1):
			while self.timer.getRemaningTime() > 0:
				await asyncio.sleep(SERVER_TICK_DELAY)	
				self.timer.update()
			print(i)
			for player in self.players:
				await player.send(chr(MessageType.START) + chr(i))
			self.timer.reset(1);
	
	async def endMessage(self, winnerID):
		# Indicate the end of a match
		#
		# Remove controle from client
		# Client will stop listening for "In Game Message"
		#
		# byte 1: <message-type> | byte 2: <match-winner>

		for player in self.players:
			await player.send(chr(MessageType.END) + chr(winnerID))

	
	async def inGameMessage(self):
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
		message = chr(MessageType.IN_GAME)
		message += chr(int(player2.center.y) + 128)
		message += chr(int(10 * (player2.center.y - int(player2.center.y)) + 128))
		message += chr(int(ball.speed.x) + 128)
		message += chr(int(10 * (ball.speed.x - int(ball.speed.x)) + 128))
		message += chr(int(ball.speed.y) + 128)
		message += chr(int(10 * (ball.speed.y - int(ball.speed.y)) + 128))

		await player1.send(message)
		
		#for player two
		message = chr(MessageType.IN_GAME)
		message += chr(int(player1.center.y) + 128)
		message += chr(int(10 * (player1.center.y - int(player1.center.y)) + 128)) 
		message += chr(int(ball.speed.x) + 128)
		message += chr(int(10 * (ball.speed.x - int(ball.speed.x)) + 128))
		message += chr(int(ball.speed.y) + 128)
		message += chr(int(10 * (ball.speed.y - int(ball.speed.y)) + 128))
		
		await player2.send(message)

	async def scoreMessage(self, scoringPlayerID):
		# Indicate that a point as been taken
		#
		# Add one point to <scoring-player-ID>
		# Reset both player positions
		# reset ball position and velocity
		#
		# byte 1: <message-type> | byte 2: <scoring-player-ID>

		for player in self.players:
			await player.send(chr(MessageType.SCORE) + chr(scoringPlayerID))

	async def restartMessage(self, restartTime):
		# After a score, restart the match after a certain time
		#
		# byte 1: <message-type> | byte 2: <remaining-type>
		
		for i in range(restartTime, -1, -1):
			while self.timer.getRemaningTime() > 0:
				await asyncio.sleep(SERVER_TICK_DELAY)	
				self.timer.update()
			for player in self.players:
				await player.send(chr(MessageType.RESTART) + chr(i))
			self.timer.reset(1);

	def resetMatch(self, scoringPlayer):		
		self.players[scoringPlayer].score += 1

		for player in self.players:
			player.hitbox.position.y = 0
		self.ball.position = Point(0, 0)
		self.ball.speed = Point(0.2, 0)

	async def gameLoop(self):
		print("|-   Match", self.ID, "game loop as been launched...")
		await self.startMessage(3)

		while True:
			#keep server to a fixed tick rate
			await calcon(SERVER_TICK_DELAY)

			if self.players[0].score >= 3:
				await self.endMessage(1)
				self.over = True
				break
			elif self.players[1].score >= 3:
				await self.endMessage(2)
				self.over = True
				break

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

			#check for score
			if self.ball.position.x > 30:
				await self.scoreMessage(1)
				self.resetMatch(0)
				await self.restartMessage(1)
			elif self.ball.position.x < -30:
				await self.scoreMessage(2)
				self.resetMatch(1)
				await self.restartMessage(1)

			#update ball position
			self.ball.position.add(self.ball.speed)

			#send up-to-date info to both clients
			await self.inGameMessage()

class Game:
	def __init__(self):
		self.matchs = list()

	def getMatchFromID(self, matchID):
		for match in self.matchs:
			if match.ID == matchID:
				return match
		return None

	async def listen(self):
		#listening for pending connection
		async with serve(self.socketHandler, SERVER_IP, SERVER_PORT):
			await asyncio.get_running_loop().create_future()

	async def requestMatchID(self, webSocket):
		# Ask the client for its match ID
		#
		# byte 1: <message-type>

		await webSocket.send(chr(MessageType.MATCHID_REQ))
		
		message = await webSocket.recv()
		return ord(message[0])

	async def matchCleaner(self):
		while True:
			await calcon((SERVER_TICK_DELAY * SERVER_TICK_PER_SECOND) / 2)
			for i in range(len(self.matchs)):
				if (self.matchs[i].over):
					print("removing match", self.matchs[i].ID);
					del self.matchs[i]
					break
			

	async def socketHandler(self, webSocket):
		print("|--- connection caught")
		
		#Getting the client's match
		matchID = await self.requestMatchID(webSocket)

		match = self.getMatchFromID(matchID)
		if match is None:
			self.matchs.append(Match(matchID))
		
		match = self.getMatchFromID(matchID)
		
		print("|-   match is : ", matchID)

		#Adding client to match's players list
		match.connectionNumber += 1
		playerID = match.connectionNumber
		match.players.append(Player(webSocket, playerID))
		print("|-   player is : ", playerID)

		#Identify client on client-side
		await match.identificationMessage(webSocket, playerID)

		#Launch game loop if there is 
		if match.connectionNumber == 2:
			print("|-   launching match ", matchID, " game loop...")
			asyncio.create_task(match.gameLoop())
		
		while True:
			#get info sent by the clients
			message = await webSocket.recv()
			
			#get player position
			player = match.getPlayerFromSocket(webSocket)
			if player is not None:
				player.center.y = (ord(message[0]) - 128) + ((ord(message[1]) - 128) / 10)

if __name__ == "__main__":
	game = Game()
	
	print("PONG SERV IS LISTENING ON PORT : 2500")

	asyncio.run(game.listen())
