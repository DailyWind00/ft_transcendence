const arenaFrag = `
varying vec2 vUv;

uniform float	time;
uniform	vec2	resolution;

void	main()
{
	vec3	color = vec3(0.1f, 0.0f, 0.15f);
	vec2	uv = (vUv * 2.0f) - 1.0f;
	
	float	d = max(smoothstep(0.98f, 0.99f, abs(uv.x)), smoothstep(0.98f, 0.99f, abs(uv.y)));
	
	d = max(d, smoothstep(0.01f, 0.001f, abs(uv.x)));

	color += vec3(d * 0.5f) * vec3(0.8f, 0.0f, 1.0f);
	gl_FragColor = vec4(color, 1.0f);
}`;

export default arenaFrag;
