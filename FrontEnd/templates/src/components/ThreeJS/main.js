import * as THREE from './three/build/three.module.js'

import cubeVert from './cube-vert.glsl.js';
import cubeFrag from './cube-frag.glsl.js';

import planeVert from './plane-vert.glsl.js';
import planeFrag from './plane-frag.glsl.js';

import paddleVert from './paddle-vert.glsl.js';
import paddleFrag from './paddle-frag.glsl.js';

import arenaVert from './arena-vert.glsl.js';
import arenaFrag from './arena-frag.glsl.js';

import ballVert from './ball-vert.glsl.js';
import ballFrag from './ball-frag.glsl.js';

const FRAMETIME = 16	//in millisecond


//==================================
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


//====================================================


function InitCamera()
{
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	camera.position.x = -150;
	camera.position.y = 15;
	camera.position.z = 100;
	camera.rotation.x = -0.2;
	return camera;
}

function InitRenderer()
{
    const renderer = new THREE.WebGLRenderer();
    const container = document.querySelector(".background");

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    return renderer;
}

function InitShader(vertex, fragment)
{
	const shader = new THREE.ShaderMaterial( {
		uniforms: {time:{ value: 0.0}, resolution:{type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight)}},
		vertexShader: vertex,
		fragmentShader: fragment
	} );
	return shader;
}

function InitPostProcess()
{
	const composer = new EffectComposer(renderer);

	const renderPass = new  RenderPass(scene, camera);
	composer.addPass(renderPass);

	const post = new ShaderPass(postProcess);
	composer.addPass(post);
	return composer;
}

var	camDefaultSpeed = 0.02;
var	camPanSpeed = 0.2
var	appState = 'DEFAULT'
var	rotSpeed = 0.015

function cameraDefaultState()
{
	if (camera.rotation.x <= -0.2) {camera.rotation.x += rotSpeed; rotSpeed -= 0.00008} else rotSpeed = 0.015;
	if (camera.position.z >= 100) {camera.position.z -= camPanSpeed; camPanSpeed -= 0.0005} else camPanSpeed = 0.2;
	if (camera.position.x >= 150 && camDefaultSpeed > -0.02) camDefaultSpeed -= 0.0001
	if (camera.position.x <= -150 && camDefaultSpeed < 0.02) camDefaultSpeed += 0.0001
	if (camera.position.y >= 15) camera.position.y -= camPanSpeed * 0.6;
	
	planeMesh.position.x = camera.position.x;
	arenaMesh.position.x  = camera.position.x;
	paddleMesh1.position.x = camera.position.x - 28;
	paddleMesh2.position.x = camera.position.x + 28;
	ballMesh.position.x = camera.position.x;
	camera.position.x += camDefaultSpeed;
}

function cameraGameState()
{
	if (camera.rotation.x >= -3.14 / 2) {camera.rotation.x -= rotSpeed; rotSpeed -= 0.00008} else rotSpeed = 0.015;
	if (camera.position.z <= 125) {camera.position.z += camPanSpeed; camPanSpeed -= 0.0005} else camPanSpeed = 0.2;
	if (camera.position.y <= 30) camera.position.y += camPanSpeed * 0.6;
}

function checkCollisionPointRec(point, rec)
{
	if (point.position.x > rec.position.x && point.position.x < (rec.position.x - rec.width) &&
		point.position.z > rec.position.z && point.position.z < (rec.position.z - rec.depth)) {
		return true;
	}
	return false;
}

var	ballSpeedX = 0.2;
var	ballSpeedZ = 0.2;

function gameLoop()
{
	if (IsKeyDown(KeyS))
		paddleMesh1.position.z += 0.3;
	else if (IsKeyDown(KeyW))
		paddleMesh1.position.z -= 0.3;

	if (paddleMesh1.position.z >= arenaMesh.position.z + 12.5 - 1.75) paddleMesh1.position.z = arenaMesh.position.z + 12.5 - 1.75;
	if (paddleMesh1.position.z <= arenaMesh.position.z - 12.5 + 1.75) paddleMesh1.position.z = arenaMesh.position.z - 12.5 + 1.75;
	
	if (paddleMesh2.position.z >= arenaMesh.position.z + 12.5 - 1.75) paddleMesh2.position.z = arenaMesh.position.z + 12.5 - 1.75;
	if (paddleMesh2.position.z <= arenaMesh.position.z - 12.5 + 1.75) paddleMesh2.position.z = arenaMesh.position.z - 12.5 + 1.75;
}

function CubeAnimation()
{
	playerInput();
	if (appState == 'DEFAULT') cameraDefaultState();
	else if (appState == 'GAME') cameraGameState();
	else if (appState == 'PLAYING') gameLoop();

	if (camPanSpeed <= 0.01) camPanSpeed = 0.001;
	if (rotSpeed <= 0.001) rotSpeed = 0.01;

	groundMesh.material.uniforms.time.value += 1;
	planeMesh.material.uniforms.time.value += 1;
	renderer.render(scene, camera);
}

function idMsg(data)
{
	;
}

function startMsg(data)
{
	;
}

function endMsg(data)
{
	;
}

function inGameMsg(data)
{
	const plr2yInt = data.charCodeAt(1);
	const plr2yDec = data.charCodeAt(2);
	const ballSpeedXInt = data.charCodeAt(3);
	const ballSpeedXDec = data.charCodeAt(4);
	const ballSpeedYInt = data.charCodeAt(5);
	const ballSpeedYDec = data.charCodeAt(6);

	paddleMesh2.position.z = (plr2yInt - 128) + 125;
	paddleMesh2.position.z += (plr2yDec - 128) / 10;
	ballMesh.position.x += ballSpeedXInt - 128;
	ballMesh.position.x += (ballSpeedXDec - 128) / 10;
	ballMesh.position.z += ballSpeedYInt - 128;
	ballMesh.position.z += (ballSpeedYDec - 128) / 10;
}

function scoreMsg(data)
{
	const scoringPlayer = data.charCodeAt(1);
}

function recvFromServ(event)
{
	if (!id) {
		id = event.data.charCodeAt(0);
		if (id == 2) {
			paddleMesh2.position.x -= 56;
			paddleMesh1.position.x += 56;
		}
		return ;
	}
}

function sendToServ()
{
	let	p1PosInt = Math.floor((paddleMesh1.position.z - 125) + 128)
	let	p1PosDec = Math.floor(10 * ((paddleMesh1.position.z - 125) - Math.floor(paddleMesh1.position.z - 125)) + 128)

	webSocket.send(String.fromCharCode(p1PosInt, p1PosDec));
}

function playerInput()
{
	if (IsKeyPressed(KeySpace)) {
		if (appState == 'DEFAULT')
			appState = 'GAME';
		else if (appState == 'GAME')
			appState = 'DEFAULT';
	}
	if (IsKeyPressed(KeyEnter) && appState == 'GAME') {
		appState = 'PLAYING';
		webSocket = new WebSocket("ws://0.0.0.0:8001/");
		webSocket.addEventListener("message", recvFromServ);
	}

	if (webSocket)
		sendToServ();
}

var id = null;
var webSocket = null;
const renderer = InitRenderer();
const camera = InitCamera();
const scene = new THREE.Scene();


//Meshes initialisation
const planeGeometry = new THREE.PlaneGeometry(500, 500);
const planeMesh = new THREE.Mesh(planeGeometry, InitShader(planeVert, planeFrag));

const groundGeometry = new THREE.PlaneGeometry(500, 500, 50, 50);
const groundMesh = new THREE.Mesh(groundGeometry, InitShader(cubeVert, cubeFrag));
groundMesh.rotation.x = -3.14 / 2;

const arenaGeometry = new THREE.BoxGeometry(68, 1, 25);
const arenaMesh = new THREE.Mesh(arenaGeometry, InitShader(arenaVert, arenaFrag));
arenaMesh.position.x = camera.position.x;
arenaMesh.position.y = 8;
arenaMesh.position.z = 125;

const paddleGeometry = new THREE.BoxGeometry(0.5, 0.5, 3.5);
const paddleMesh1 = new THREE.Mesh(paddleGeometry, InitShader(paddleVert, paddleFrag))
paddleMesh1.position.x = camera.position.x - 28;
paddleMesh1.position.y = 8.5;
paddleMesh1.position.z = 125;

const paddleMesh2 = new THREE.Mesh(paddleGeometry, InitShader(paddleVert, paddleFrag))
paddleMesh2.position.x = camera.position.x + 28;
paddleMesh2.position.y = 8.5;
paddleMesh2.position.z = 125;

const ballGeometry = new THREE.SphereGeometry(0.5, 15.0);
const ballMesh = new THREE.Mesh(ballGeometry, InitShader(ballVert, ballFrag));
ballMesh.position.x = camera.position.x;
ballMesh.position.y = 8.5;
ballMesh.position.z = 125;

scene.add(planeMesh);
scene.add(groundMesh);
scene.add(paddleMesh1);
scene.add(paddleMesh2);
scene.add(arenaMesh);
scene.add(ballMesh);

InitInputHandling();

setInterval(CubeAnimation, FRAMETIME);

//renderer.setAnimationLoop( CubeAnimation );
