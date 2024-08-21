const cubeFrag = `
varying vec2 vUv;

uniform float	time;

vec3	getGrid(vec2 uv, float width, vec3 baseColor)
{
	float	c = max(smoothstep(width, 0.001f, abs(uv.x)), smoothstep(width, 0.001f, abs(uv.y)));
	
	return vec3(c) * baseColor;
}

void	main()
{
	vec3	color = vec3(0);
	vec2	uv = fract(vUv * 100.0f) - 0.5f;

	color = getGrid(uv, 0.04f, vec3(1.5f, 0.8f, 2.0f));
	color += getGrid(uv, 0.08f, vec3(1.0f, 0.4f, 1.5f));

	color *= vec3(-(abs(vUv.y) - 0.7f)) * 3.0;
	//color += vec3(-vUv.x) * 0.9;
	gl_FragColor = vec4(color, 1.0f);
}`;

export default cubeFrag;
