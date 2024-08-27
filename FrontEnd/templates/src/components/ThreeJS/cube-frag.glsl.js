const cubeFrag = `
varying vec2	vUv;
varying vec4	vPosition;
varying vec3	vCamPos;

uniform float	time;
uniform vec2	resolution;

vec3	getGrid(vec2 uv, float width, vec3 baseColor)
{
	float	c = max(smoothstep(width, 0.001f, abs(uv.x)), smoothstep(width, 0.001f, abs(uv.y)));
	
	return vec3(c) * baseColor;
}

float	getFogFactor(float d)
{
	const float fogMax = 30.0f;
	const float fogMin = 1.0f;

	if (d >= fogMax) return 1.0f;
	if (d <= fogMin) return 0.0f;

	return 1.0f - (fogMax - d) / (fogMax - fogMin);
}

void	main()
{
	vec3	color = vec3(0.1f, 0.0f, 0.2f);
	vec2	uv = fract(vUv * 250.0f) - 0.5f;
	
	color += getGrid(uv, 0.08f, vec3(1.5f, 0.8f, 2.0f));
	
	vec3	hColor = vec3(vPosition.z * 0.1f);

	hColor *= 8.0f;
	hColor = floor(hColor);
	hColor /= 8.0f;

	float	dFog = distance(vec4(vCamPos, 1.0f), vPosition) * 0.012f;


	//color *= vec3(-(abs(vUv.y) - 0.7f)) * 3.0f;

	gl_FragColor = mix(vec4(1.0f, 0.68f, 0.2f, 1.0f), vec4(color * hColor, 1.0f), getFogFactor(pow(dFog, 7.0f)));
}`;

export default cubeFrag;
