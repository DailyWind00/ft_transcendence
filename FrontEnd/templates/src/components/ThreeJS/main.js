import * as THREE from './three/build/three.module.js'

import cubeVert from './cube-vert.glsl.js';
import cubeFrag from './cube-frag.glsl.js';
import planeVert from './plane-vert.glsl.js';
import planeFrag from './plane-frag.glsl.js';
import postProcess from './postProcess.glsl.js';

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

var camSpeed = -0.02;

function CubeAnimation()
{
	renderer.setSize(window.innerWidth, window.innerHeight);
	if (camera.position.x >= 150 && camSpeed > -0.02)
		camSpeed -= 0.005

	if (camera.position.x <= -150 && camSpeed < 0.02)
		camSpeed += 0.005
	// if (camera.position.y < 10.0)
	// 	camera.position.y += 0.03;
	// if (camera.position.z > 90.0)
	// 	camera.position.z -= 0.06;
	// if (camera.rotation.x >= -3.14 / 2)
	// 	camera.rotation.x -= 0.005;
	groundMesh.material.uniforms.time.value += 1;
	planeMesh.material.uniforms.time.value += 1;
	camera.position.x += camSpeed;
	planeMesh.position.x = camera.position.x
	renderer.render(scene, camera);
}

const renderer = InitRenderer();
const camera = InitCamera();
const scene = new THREE.Scene();
//const composer = InitPostProcess();

const planeGeometry = new THREE.PlaneGeometry(500, 500);
const planeMesh = new THREE.Mesh(planeGeometry, InitShader(planeVert, planeFrag));

const groundGeometry = new THREE.PlaneGeometry(500, 500, 25, 25);
const groundMesh = new THREE.Mesh(groundGeometry, InitShader(cubeVert, cubeFrag));
groundMesh.rotation.x = -3.14 / 2;

scene.add(planeMesh);
scene.add(groundMesh);
scene.fog = new THREE.FogExp2(0xaaaaaa, 0.4);

renderer.setAnimationLoop( CubeAnimation );
