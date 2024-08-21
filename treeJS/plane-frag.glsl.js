const planeFrag = `
varying vec2 vUv;

uniform float	time;

float	circle(vec2 pos, float rad, float blur)
{
	return length(pos) - rad;
}

void	main()
{
	vec3	color = vec3(0.01f, 0.02f, 0.3f);
	vec3	cColor = vec3(1.0f, 0.4f, 0.1f);
	vec2	uv = (vUv * 2.0f) - 1.0f;

	float	c = circle(uv - vec2(0.0f, 0.1f), 0.5f, 0.1f);

	if (c <= 0.0f)
		color = cColor * (0.9f + smoothstep(-0.6f, 0.9f, uv.y) * 2.0f);
	else
		color.rg += (cColor.rg * smoothstep(0.8f, -0.01f, abs(c + (abs(uv.y) * 0.5f)))) * 1.8;
	gl_FragColor = vec4(color, 1.0f);
}`;

export default planeFrag;
