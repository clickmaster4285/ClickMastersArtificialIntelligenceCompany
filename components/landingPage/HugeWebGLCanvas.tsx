import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";

const vert = /* glsl */ `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Animated metaballs / flowing gradient with mouse parallax + grain
const frag = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec2 uMouseTarget;

// hash + noise
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0,0.0));
  float c = hash(i + vec2(0.0,1.0));
  float d = hash(i + vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

// smooth min for metaballs
float smin(float a, float b, float k){
  float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*uResolution) / min(uResolution.x, uResolution.y);
  float t = uTime * 0.18;

  // domain warp using fbm for flowing organic motion
  vec2 q = vec2(fbm(uv*1.4 + t), fbm(uv*1.4 - t + 7.3));
  vec2 r = vec2(fbm(uv*2.0 + q + vec2(1.7,9.2) + t*0.7),
                fbm(uv*2.0 + q + vec2(8.3,2.8) - t*0.6));
  float n = fbm(uv*1.2 + r);

  // metaballs influenced by mouse
  vec2 m = uMouse * 0.55;
  float d1 = length(uv - vec2(sin(t*1.3)*0.35, cos(t*1.1)*0.3) - m*0.3) - 0.28;
  float d2 = length(uv - vec2(cos(t*0.9)*0.45, sin(t*1.5)*0.25) + m*0.2) - 0.22;
  float d3 = length(uv + vec2(sin(t*0.7)*0.3, cos(t*0.5)*0.4) - m*0.15) - 0.18;
  float d = smin(smin(d1, d2, 0.35), d3, 0.35);
  float blob = smoothstep(0.05, -0.25, d);

  // color palette (purple -> magenta -> warm orange) — matches brand
  vec3 c1 = vec3(0.10, 0.06, 0.22);   // deep purple bg
  vec3 c2 = vec3(0.55, 0.25, 0.95);   // violet
  vec3 c3 = vec3(0.95, 0.35, 0.55);   // magenta
  vec3 c4 = vec3(1.00, 0.65, 0.35);   // warm orange highlight

  vec3 col = mix(c1, c2, smoothstep(0.2, 0.7, n));
  col = mix(col, c3, smoothstep(0.45, 0.85, n + blob*0.4));
  col = mix(col, c4, blob * smoothstep(0.5, 1.0, n + 0.2));

  // soft vignette
  float vig = smoothstep(1.2, 0.2, length(uv));
  col *= mix(0.55, 1.05, vig);

  // subtle grain
  float g = (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.06;
  col += g;

  // contour lines for "topography" feel
  float lines = smoothstep(0.0, 0.02, abs(fract(n*8.0 + t*0.5) - 0.5) - 0.46);
  col += (1.0 - lines) * 0.08 * vec3(1.0, 0.9, 1.0);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function HugeWebGLCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: false });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    const geometry = new Triangle(gl);
    const mouse = new Vec2(0, 0);
    const mouseTarget = new Vec2(0, 0);

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(1, 1) },
        uMouse: { value: mouse },
        uMouseTarget: { value: mouseTarget },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value.set(w * renderer.dpr, h * renderer.dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouseTarget.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouseTarget.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const start = performance.now();
    const loop = () => {
      const t = (performance.now() - start) / 1000;
      // smooth mouse
      mouse.x += (mouseTarget.x - mouse.x) * 0.05;
      mouse.y += (mouseTarget.y - mouse.y) * 0.05;
      program.uniforms.uTime.value = t;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" aria-hidden />;
}
