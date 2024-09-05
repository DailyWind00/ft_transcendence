const paddleFrag = `
varying vec2	vUv;
varying	vec4	vPosition;

uniform float	time;
uniform	vec2	resolution;

void	main()
{
	vec3	color = vec3(0.1f, 0.0f, 0.15f);
	
	if (vPosition.y >= 0.0f)
		color += vec3(vPosition.y * 4.0f);
	gl_FragColor = vec4(color, 1.0f);
}`;

export default paddleFrag;
