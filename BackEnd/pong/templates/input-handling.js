const	KeySpace = 32;
const	KeyW = 87;
const	KeyS = 83;
const	KeyA = 65;
const	KeyD = 68;
const	KeyUp = 38;
const	KeyDown = 40;
const	KeyEnter = 13;

var	KeyCodes;

function InitInputHandling()
{
	KeyCodes = new Set();
	document.addEventListener('keydown', handleKeyDown);
	document.addEventListener('keyup', handleKeyUp);
}

function handleKeyDown(event)
{
	if (!KeyCodes.has(event.keyCode))
		KeyCodes.add(event.keyCode);
}

function handleKeyUp(event)
{
	if (KeyCodes.has(event.keyCode))
		KeyCodes.delete(event.keyCode);
}

function IsKeyDown(key)
{
	if (KeyCodes.has(key))
		return true;
	return false;
}

function IsKeyPressed(key)
{
	if (KeyCodes.has(key)) {
		KeyCodes.delete(key);
		return true;
	}
	return false;
}
