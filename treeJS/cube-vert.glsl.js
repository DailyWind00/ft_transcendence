const cubeVert = `
varying vec2 vUv;

uniform float	time;

void	main()
{
	vec4	result = vec4(position, 1.0);
	
	result.z = sin(result.x + (time * 0.01f)) * 0.2f;
	result.z += sin(result.y + (time * 0.01f)) * 0.2f;
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * result;
}`;

export default cubeVert;
