import { useEffect, useRef } from "react";
import { introDone, prefersReducedMotion } from "../lib/motion";
import "./PoolSurface.css";

/**
 * A pool you can splash. A small CPU height-field (wave equation) holds the
 * water surface; a WebGL shader renders the tiled pool floor seen through it
 * (refraction, sunlight caustics, specular glints) — or, with `image`, a real
 * photo seen through the water.
 *
 * Elements matching `floatSelector` inside the host bob on the actual water
 * height under them, so a splash near the headline rocks its letters.
 *
 * Decorative only: it never captures clicks meant for links/buttons, freezes
 * to one still frame for reduced motion, and pauses when off-screen.
 */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uH;
uniform vec2 uTexel;
uniform vec2 uRes;
uniform float uTime;
uniform sampler2D uPhoto;
uniform vec2 uPhotoSize;
uniform float uUsePhoto;

#define TAU 6.28318530718

float hgt(vec2 uv) { return (texture2D(uH, vec2(uv.x, 1.0 - uv.y)).r - 0.5) * 4.0; }

// Sunlight caustics on the pool floor (classic iterative warp).
float caustic(vec2 uv, float t) {
  vec2 p = mod(uv * TAU, TAU) - 250.0;
  vec2 i = p;
  float c = 1.0;
  float inten = 0.005;
  for (int n = 0; n < 4; n++) {
    float tt = t * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));
  }
  c /= 4.0;
  c = 1.17 - pow(c, 1.4);
  return clamp(pow(abs(c), 8.0), 0.0, 1.0);
}

void main() {
  vec2 uv = vUv;
  float hl = hgt(uv - vec2(uTexel.x, 0.0));
  float hr = hgt(uv + vec2(uTexel.x, 0.0));
  float hd = hgt(uv - vec2(0.0, uTexel.y));
  float hu = hgt(uv + vec2(0.0, uTexel.y));
  vec2 grad = vec2(hr - hl, hu - hd);
  vec3 n = normalize(vec3(-grad * 2.2, 1.0));

  vec3 col;
  if (uUsePhoto > 0.5) {
    // a real photo seen through the water: refract it, nothing more
    vec2 puv = uv + n.xy * 0.009;
    float rs = uRes.x / uRes.y, ri = uPhotoSize.x / uPhotoSize.y;
    vec2 sc = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
    col = texture2D(uPhoto, (puv - 0.5) * sc + 0.5).rgb;
  } else {
    // open water: a soft shallow-to-deep blue with drifting sunlight caustics
    vec2 fuv = uv + n.xy * 0.022;
    vec3 shallow = vec3(0.36, 0.84, 0.97);
    vec3 deep = vec3(0.09, 0.62, 0.86);
    col = mix(deep, shallow, smoothstep(0.0, 1.0, uv.y * 0.9 + 0.1));
    vec2 cuv = fuv * vec2(uRes.x / uRes.y, 1.0) * 0.55;
    col += caustic(cuv + 0.3 * n.xy, uTime * 0.35) * 0.45;
  }

  // light & shade from the surface slope, plus sun glints
  // (much gentler over a photo, so it stays a clear, true picture)
  float k = mix(1.0, 0.22, uUsePhoto);
  col *= 1.0 + dot(n.xy, vec2(-0.6, 0.8)) * 0.9 * k;
  vec3 L = normalize(vec3(-0.35, 0.55, 1.0));
  float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 70.0);
  col += spec * 0.9 * k;

  gl_FragColor = vec4(col, 1.0);
}`;

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

export default function PoolSurface({
  floatSelector,
  ambient = true,
  image,
  splashOnEnter = false,
  onSplash,
}) {
  const ref = useRef(null);
  const onSplashRef = useRef(onSplash);
  onSplashRef.current = onSplash;

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
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
    const u = (n) => gl.getUniformLocation(prog, n);
    const uTexel = u("uTexel"), uRes = u("uRes"), uTime = u("uTime");
    gl.uniform1i(u("uH"), 0);
    gl.uniform1i(u("uPhoto"), 1);
    gl.uniform1f(u("uUsePhoto"), 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

    const reduced = prefersReducedMotion();
    const s = {
      W: 0, H: 0, cur: null, prev: null, bytes: null,
      raf: 0, visible: true, disposed: false,
      start: performance.now(), last: performance.now(), acc: 0,
      nextDrop: 0, floats: [], pointer: null, splashed: false,
    };

    // --- simulation -------------------------------------------------------
    const allocate = () => {
      const r = host.getBoundingClientRect();
      const W = 180;
      const H = Math.max(40, Math.min(220, Math.round((W * r.height) / Math.max(1, r.width))));
      if (W === s.W && H === s.H) return;
      s.W = W;
      s.H = H;
      s.cur = new Float32Array(W * H);
      s.prev = new Float32Array(W * H);
      s.bytes = new Uint8Array(W * H);
      gl.uniform2f(uTexel, 1 / W, 1 / H);
    };

    const disturb = (gx, gy, radius, strength) => {
      const { W, H, cur } = s;
      const r2 = radius * radius;
      for (let y = Math.max(1, Math.floor(gy - radius)); y < Math.min(H - 1, gy + radius); y++) {
        for (let x = Math.max(1, Math.floor(gx - radius)); x < Math.min(W - 1, gx + radius); x++) {
          const d2 = (x - gx) ** 2 + (y - gy) ** 2;
          if (d2 < r2) cur[y * W + x] += strength * (1 - d2 / r2);
        }
      }
    };

    const step = () => {
      const { W, H } = s;
      const a = s.cur, b = s.prev;
      for (let y = 1; y < H - 1; y++) {
        const row = y * W;
        for (let x = 1; x < W - 1; x++) {
          const i = row + x;
          b[i] = ((a[i - 1] + a[i + 1] + a[i - W] + a[i + W]) * 0.5 - b[i]) * 0.982;
        }
      }
      s.cur = b;
      s.prev = a;
    };

    const heightAt = (gx, gy) => {
      const x = Math.min(s.W - 1, Math.max(0, Math.round(gx)));
      const y = Math.min(s.H - 1, Math.max(0, Math.round(gy)));
      return s.cur[y * s.W + x];
    };

    const toGrid = (clientX, clientY) => {
      const r = host.getBoundingClientRect();
      return [((clientX - r.left) / r.width) * s.W, ((clientY - r.top) / r.height) * s.H, r];
    };

    // --- floating elements ---------------------------------------------------
    const measureFloats = () => {
      if (!floatSelector) return;
      const r = host.getBoundingClientRect();
      s.floats = [...host.querySelectorAll(floatSelector)].map((el, i) => {
        const b = el.getBoundingClientRect();
        return {
          el, i,
          gx: ((b.left + b.width / 2 - r.left) / r.width) * s.W,
          gy: ((b.top + b.height * 0.85 - r.top) / r.height) * s.H,
        };
      });
    };

    const updateFloats = (t) => {
      for (const f of s.floats) {
        const h = heightAt(f.gx, f.gy);
        const slope = heightAt(f.gx + 2, f.gy) - heightAt(f.gx - 2, f.gy);
        const bob = Math.sin(t * 1.7 + f.i * 0.55) * 3;
        const y = Math.max(-26, Math.min(26, -h * 10 + bob));
        const rot = Math.max(-10, Math.min(10, slope * 14 + Math.sin(t * 1.3 + f.i) * 1.5));
        f.el.style.translate = `0 ${y.toFixed(1)}px`;
        f.el.style.rotate = `${rot.toFixed(2)}deg`;
      }
    };

    // --- render ---------------------------------------------------------------
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

    const draw = (t) => {
      resize();
      const { cur, bytes } = s;
      for (let i = 0; i < cur.length; i++) {
        const v = cur[i] * 0.25 + 0.5;
        bytes[i] = v <= 0 ? 0 : v >= 1 ? 255 : v * 255;
      }
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, s.W, s.H, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, bytes);
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const frame = (now) => {
      s.raf = 0;
      if (s.disposed) return;
      const t = (now - s.start) / 1000;
      // fixed 60Hz simulation steps so 120Hz screens don't run double speed
      s.acc += Math.min(100, now - s.last);
      s.last = now;
      if (ambient && now > s.nextDrop) {
        disturb(1 + Math.random() * (s.W - 2), 1 + Math.random() * (s.H - 2), 2.5, 0.35 + Math.random() * 0.35);
        s.nextDrop = now + 500 + Math.random() * 1100;
      }
      if (s.pointer) {
        const [gx, gy] = toGrid(s.pointer[0], s.pointer[1]);
        disturb(gx, gy, 2.6, 0.22);
        s.pointer = null;
      }
      while (s.acc >= 16.6) {
        step();
        s.acc -= 16.6;
      }
      updateFloats(t);
      draw(t);
      if (s.visible && !document.hidden) s.raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!s.raf && !s.disposed && !reduced) {
        s.last = performance.now();
        s.raf = requestAnimationFrame(frame);
      }
    };

    allocate();
    resize();
    measureFloats();

    const splashAt = (clientX, clientY, big = true) => {
      const [gx, gy] = toGrid(clientX, clientY);
      disturb(gx, gy, big ? 6 : 3, big ? 5 : 2);
      if (!s.splashed) {
        s.splashed = true;
        onSplashRef.current?.();
      }
    };

    // --- input ------------------------------------------------------------------
    const onDown = (e) => {
      if (e.target.closest("a, button, input, label, [data-no-splash]")) return;
      splashAt(e.clientX, e.clientY, true);
    };
    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      s.pointer = [e.clientX, e.clientY];
    };
    if (!reduced) {
      host.addEventListener("pointerdown", onDown);
      host.addEventListener("pointermove", onMove);
    }

    const ro = new ResizeObserver(() => {
      allocate();
      measureFloats();
      if (reduced) draw(4);
    });
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting;
      if (s.visible) kick();
    });
    io.observe(canvas);
    const onVis = () => !document.hidden && kick();
    document.addEventListener("visibilitychange", onVis);

    // Re-measure float targets once fonts and the intro have settled.
    document.fonts?.ready.then(() => !s.disposed && measureFloats());
    introDone.then(() => {
      if (s.disposed) return;
      setTimeout(() => {
        if (s.disposed) return;
        measureFloats();
        if (splashOnEnter && !reduced && s.floats.length) {
          // one splash beside the headline so the letters visibly rock
          const f = s.floats[Math.floor(s.floats.length * 0.6)];
          disturb(f.gx, f.gy + 4, 7, 6);
        }
      }, 1400);
    });

    let photoTex = null;
    const start = () => {
      canvas.classList.add("is-ready");
      if (reduced) draw(4);
      else kick();
    };
    if (image) {
      // The <img> under the canvas paints instantly; the canvas fades in over
      // it once the same photo is on the GPU.
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (s.disposed) return;
        photoTex = gl.createTexture();
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, photoTex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.activeTexture(gl.TEXTURE0);
        gl.uniform2f(u("uPhotoSize"), img.naturalWidth, img.naturalHeight);
        gl.uniform1f(u("uUsePhoto"), 1);
        start();
      };
      img.src = image;
    } else {
      start();
    }

    return () => {
      s.disposed = true;
      cancelAnimationFrame(s.raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointermove", onMove);
      s.floats.forEach((f) => {
        f.el.style.translate = "";
        f.el.style.rotate = "";
      });
      gl.deleteTexture(tex);
      if (photoTex) gl.deleteTexture(photoTex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [floatSelector, ambient, image, splashOnEnter]);

  return <canvas ref={ref} className="pool-surface" aria-hidden="true" />;
}
