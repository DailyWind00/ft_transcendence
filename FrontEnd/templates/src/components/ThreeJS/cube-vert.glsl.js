const cubeVert = `
varying vec2	vUv;
varying vec4	vPosition;
varying vec3	vCamPos;

uniform float	time;

float random(vec2 st)
{
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

float	noise(vec2 st)
{
    vec2	i = floor(st);
    vec2	f = fract(st);

    float	a = random(i);
    float	b = random(i + vec2(1.0, 0.0));
    float	c = random(i + vec2(0.0, 1.0));
    float	d = random(i + vec2(1.0, 1.0));

    vec2	u = f*f*(3.0-2.0*f);
    
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void	main()
{
	vec4	result = vec4(position, 1.0);
	
	vUv = uv;
	vCamPos = cameraPosition;
	for (float i = 1.0f; i > 0.0f; i -= 0.02f)
		result.z += noise(result.xy * vec2(sin(i * 0.05))) * uv.y;
	vPosition = result;
	gl_Position = projectionMatrix * modelViewMatrix * result;
}`;

export default cubeVert;
