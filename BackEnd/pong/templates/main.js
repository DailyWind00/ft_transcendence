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
	const renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
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
	console.log(rec.geometry);
	if (point.position.x > rec.position.x && point.position.x < (rec.position.x - rec.width) &&
		point.position.z > rec.position.z && point.position.z < (rec.position.z - rec.depth)) {
		console.log(rec.depth);
		return true;
	}
	return false;
}

var	ballSpeedX = 0.2;
var	ballSpeedZ = 0.2;

function gameLoop()
{
	if (IsKeyDown(KeyS))
		paddleMesh1.position.z += 0.5;
	else if (IsKeyDown(KeyW))
		paddleMesh1.position.z -= 0.5;

	if (paddleMesh1.position.z >= arenaMesh.position.z + 12.5 - 1.75) paddleMesh1.position.z = arenaMesh.position.z + 12.5 - 1.75;
	if (paddleMesh1.position.z <= arenaMesh.position.z - 12.5 + 1.75) paddleMesh1.position.z = arenaMesh.position.z - 12.5 + 1.75;

	if (IsKeyDown(KeyUp))
		paddleMesh2.position.z -= 0.5;
	else if (IsKeyDown(KeyDown))
		paddleMesh2.position.z += 0.5;
	
	if (paddleMesh2.position.z >= arenaMesh.position.z + 12.5 - 1.75) paddleMesh2.position.z = arenaMesh.position.z + 12.5 - 1.75;
	if (paddleMesh2.position.z <= arenaMesh.position.z - 12.5 + 1.75) paddleMesh2.position.z = arenaMesh.position.z - 12.5 + 1.75;

	if (ballMesh.position.x > arenaMesh.position.x + 34 || ballMesh.position.x < arenaMesh.position.x - 34 ||
		checkCollisionPointRec(ballMesh, paddleMesh1) || checkCollisionPointRec(ballMesh, paddleMesh2)) ballSpeedX *= -1;
	if (ballMesh.position.z > arenaMesh.position.z + 12.5 || ballMesh.position.z < arenaMesh.position.z - 12.5) ballSpeedZ *= -1;

	ballMesh.position.x += ballSpeedX;
	ballMesh.position.z += ballSpeedZ;
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

function playerInput()
{
	if (IsKeyPressed(KeySpace)) {
		if (appState == 'DEFAULT')
			appState = 'GAME';
		else if (appState == 'GAME')
			appState = 'DEFAULT';
	}
	if (IsKeyPressed(KeyEnter) && appState == 'GAME')
		appState = 'PLAYING';
}

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

renderer.setAnimationLoop( CubeAnimation );
