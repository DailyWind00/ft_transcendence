const paddleVert = `
varying vec4	vPosition;
varying vec3	vCamPos;
varying vec2	vUv;

uniform float	time;

void	main()
{
	vec4	result = vec4(position, 1.0f);

	vUv = uv;
	vCamPos = cameraPosition;
	vPosition = result;
	gl_Position = projectionMatrix * modelViewMatrix * result;
}`;

export default paddleVert;
