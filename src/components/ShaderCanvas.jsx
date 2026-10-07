import { useEffect, useRef } from "react";
import { introDone, prefersReducedMotion } from "../lib/motion";
import "./ShaderCanvas.css";

/**
 * Lightweight raw-WebGL canvas (no three.js) for the Unicorn-Studio-style
 * effects: a liquid "water" distortion over a photo (heroes) and a slow
 * domain-warped liquid gradient (stats band, closing CTAs).
 *
 * Purely decorative: it sits over/behind real content, renders nothing if
 * WebGL is unavailable, freezes on a single frame for reduced motion, and
 * stops its render loop whenever it is off-screen or the tab is hidden.
 */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const COMMON = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = r * p * 2.02; a *= 0.5; }
  return v;
}`;

const WATER_FRAG = `${COMMON}
uniform sampler2D uTex;
uniform vec2 uImg;
uniform float uScroll;
uniform float uReveal;

vec2 cover(vec2 uv) {
  float rs = uRes.x / uRes.y, ri = uImg.x / uImg.y;
  vec2 s = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
  return (uv - 0.5) * s + 0.5;
}

void main() {
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  float zoom = 1.0 + 0.10 * uScroll + 0.18 * (1.0 - uReveal);
  vec2 uv = (vUv - 0.5) / zoom + 0.5;
  uv.y += uScroll * 0.06;

  vec2 p = vUv * asp * 2.6;
  float t = uTime;
  float n1 = fbm(p + vec2(t * 0.05, t * 0.07));
  float n2 = fbm(p * 1.4 - vec2(t * 0.06, -t * 0.03) + n1 * 1.5);
  float amt = 0.010 + 0.035 * uScroll + 0.09 * (1.0 - uReveal);
  vec2 flow = (vec2(n1, n2) - 0.5) * amt;

  vec2 d = (vUv - uMouse) * asp;
  float dist = length(d);
  float ripple = sin(dist * 46.0 - t * 5.5) * exp(-dist * 5.5) * 0.014 * uHover;
  vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
  vec2 off = flow + dir * ripple / asp;

  vec2 tuv = cover(uv + off);
  float ca = length(off) * 0.3 + 0.0006;
  vec3 col;
  col.r = texture2D(uTex, tuv + vec2(ca, 0.0)).r;
  col.g = texture2D(uTex, tuv).g;
  col.b = texture2D(uTex, tuv - vec2(ca, 0.0)).b;

  // sun glints riding the flow field
  float glint = pow(max(0.0, 1.0 - abs(n2 - 0.52) * 4.0), 6.0);
  col += glint * 0.05 * vec3(1.0, 0.94, 0.78);
  col += 0.07 * uHover * exp(-dist * 4.0) * vec3(1.0, 0.88, 0.66);

  col += (hash(vUv * uRes + fract(t) * 91.0) - 0.5) * 0.045;
  col = mix(vec3(0.071, 0.231, 0.247), col, smoothstep(0.0, 0.35, uReveal));
  gl_FragColor = vec4(col, 1.0);
}`;

const LIQUID_FRAG = `${COMMON}
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;

void main() {
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = vUv * asp * 1.25;
  float t = uTime * 0.6;
  vec2 m = (uMouse - 0.5) * asp * 0.35 * uHover;
  vec2 q = vec2(fbm(p + t * 0.05 + m), fbm(p + vec2(5.2, 1.3) - t * 0.04));
  vec2 r = vec2(fbm(p + 3.6 * q + vec2(1.7, 9.2) + t * 0.07),
                fbm(p + 3.6 * q + vec2(8.3, 2.8) - t * 0.05));
  float f = fbm(p + 3.6 * r);
  f += 0.18 * uHover * exp(-length((vUv - uMouse) * asp) * 3.5);

  vec3 col = mix(uC1, uC2, smoothstep(0.25, 0.75, f));
  col = mix(col, uC3, smoothstep(0.62, 1.05, f * (0.6 + length(q))));
  // soft ordered grain, the dithered "print" texture unicorn.studio scenes have
  col += (hash(floor(vUv * uRes / 2.0) + fract(t) * 13.0) - 0.5) * 0.035;
  gl_FragColor = vec4(col, 1.0);
}`;

function hexToVec3(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

export default function ShaderCanvas({
  variant = "liquid",
  image,
  colors = ["#123b3f", "#1b4e52", "#2e9aa3"],
  className = "",
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, variant === "water" ? WATER_FRAG : LIQUID_FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name) => gl.getUniformLocation(prog, name);
    const uRes = u("uRes"), uTime = u("uTime"), uMouse = u("uMouse"), uHover = u("uHover");
    const uScroll = u("uScroll"), uReveal = u("uReveal"), uImg = u("uImg");

    if (variant !== "water") {
      const [c1, c2, c3] = colors.map(hexToVec3);
      gl.uniform3fv(u("uC1"), c1);
      gl.uniform3fv(u("uC2"), c2);
      gl.uniform3fv(u("uC3"), c3);
    }

    const reduced = prefersReducedMotion();
    const host = canvas.parentElement;
    const state = {
      mouse: [0.5, 0.5], target: [0.5, 0.5],
      hover: 0, hoverTarget: 0,
      reveal: variant === "water" && !reduced ? 0 : 1,
      ready: variant !== "water",
      visible: true, raf: 0, start: performance.now(), disposed: false,
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };

    const draw = (now) => {
      resize();
      state.mouse[0] += (state.target[0] - state.mouse[0]) * 0.08;
      state.mouse[1] += (state.target[1] - state.mouse[1]) * 0.08;
      state.hover += (state.hoverTarget - state.hover) * 0.05;
      gl.uniform1f(uTime, reduced ? 4.0 : (now - state.start) / 1000);
      gl.uniform2f(uMouse, state.mouse[0], state.mouse[1]);
      gl.uniform1f(uHover, state.hover);
      if (variant === "water") {
        const rect = canvas.getBoundingClientRect();
        const s = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
        gl.uniform1f(uScroll, s);
        gl.uniform1f(uReveal, state.reveal);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now) => {
      state.raf = 0;
      if (!state.ready) return;
      draw(now);
      if (!reduced && state.visible && !document.hidden) state.raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!state.raf && state.ready && !state.disposed) state.raf = requestAnimationFrame(loop);
    };

    let revealTween = 0;
    if (variant === "water") {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (state.disposed) return;
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.uniform2f(uImg, img.naturalWidth, img.naturalHeight);
        state.ready = true;
        canvas.classList.add("is-ready");
        if (!reduced) {
          introDone.then(() => {
            if (state.disposed) return;
            const t0 = performance.now();
            const step = (now) => {
              const k = Math.min(1, (now - t0) / 2200);
              state.reveal = 1 - Math.pow(1 - k, 4);
              if (k < 1) revealTween = requestAnimationFrame(step);
            };
            revealTween = requestAnimationFrame(step);
          });
        }
        kick();
      };
      img.src = image;
    } else {
      canvas.classList.add("is-ready");
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      state.target = [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height];
      state.hoverTarget = 1;
    };
    const onLeave = () => (state.hoverTarget = 0);
    host?.addEventListener("pointermove", onMove);
    host?.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(([entry]) => {
      state.visible = entry.isIntersecting;
      if (state.visible) kick();
    });
    io.observe(canvas);
    const onVis = () => !document.hidden && kick();
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => reduced && state.ready && draw(performance.now()));
    ro.observe(canvas);
    kick();

    return () => {
      state.disposed = true;
      cancelAnimationFrame(state.raf);
      cancelAnimationFrame(revealTween);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host?.removeEventListener("pointermove", onMove);
      host?.removeEventListener("pointerleave", onLeave);
      // Don't lose the context: StrictMode re-runs this effect on the same canvas.
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
    // colors is a literal array per call site; stringify to keep the effect stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, image, colors.join(",")]);

  return <canvas ref={ref} className={`shader-canvas ${className}`} style={style} aria-hidden="true" />;
}
