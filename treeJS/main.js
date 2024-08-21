import * as THREE from './three/build/three.module.js'

import cubeVert from './cube-vert.glsl.js';
import cubeFrag from './cube-frag.glsl.js';
import planeVert from './plane-vert.glsl.js';
import planeFrag from './plane-frag.glsl.js';

function InitCamera()
{
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	camera.position.x = 0;
	camera.position.y = 10;
	camera.position.z = 20;
	camera.rotation.x = -0.5;
	return camera;
}

function InitRenderer()
{
	const renderer = new THREE.WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	return renderer;
}

function InitShader(vertex, fragment)
{
	const shader = new THREE.ShaderMaterial( {
		uniforms: {time:{ value: 0.0}},
		vertexShader: vertex,
		fragmentShader: fragment
	} );
	return shader;
}

function CubeAnimation()
{
	/*if (camera.position.y < 3.0)
		camera.position.y += 0.03;
	if (camera.position.z > 5.0)
		camera.position.z -= 0.06;
	if (camera.rotation.x >= -3.14 / 2)
		camera.rotation.x -= 0.005;
	*/groundMesh.material.uniforms.time.value += 1;
	planeMesh.material.uniforms.time.value += 1;
	renderer.render(scene, camera);
}

const renderer = InitRenderer();
const camera = InitCamera();
const scene = new THREE.Scene();

const planeGeometry = new THREE.PlaneGeometry(20, 20, 20, 20);
const planeMesh = new THREE.Mesh(planeGeometry, InitShader(planeVert, planeFrag));
planeMesh.position.z = -5;

const groundGeometry = new THREE.PlaneGeometry(500, 500, 500, 500);
const groundMesh = new THREE.Mesh(groundGeometry, InitShader(cubeVert, cubeFrag));
groundMesh.rotation.x = -3.14 / 2;

//scene.add(planeMesh);
scene.add(groundMesh);
scene.fog = new THREE.FogExp2(0xaaaaaa, 0.4);

renderer.setAnimationLoop( CubeAnimation );
