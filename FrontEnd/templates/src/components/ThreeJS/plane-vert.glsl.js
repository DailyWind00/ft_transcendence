const planeVert = `
varying vec2 vUv;

uniform float	time;

void	main()
{
	vec4	result = vec4(position, 1.0f);

	//result.z += sin(result.x * 0.01f) * 50.0f;
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * result;
}`;

export default planeVert;
