"use client";

import React, { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

export interface LiquidChromeProps extends React.HTMLAttributes<HTMLDivElement> {
  baseColor?: [number, number, number];
  speed?: number;
  amplitude?: number;
  frequencyX?: number;
  frequencyY?: number;
  interactive?: boolean;
}

export const LiquidChrome: React.FC<LiquidChromeProps> = ({
  baseColor = [0.1, 0.02, 0.04],
  speed = 0.25,
  amplitude = 0.35,
  frequencyX = 3,
  frequencyY = 3,
  interactive = true,
  className = "",
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let renderer: Renderer;
    try {
      renderer = new Renderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision mediump float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
          vec2 fragCoord = uvCoord * uResolution.xy;
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

          for (float i = 1.0; i < 5.0; i++){
              uv.x += (uAmplitude / i) * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
              uv.y += (uAmplitude / i) * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
          }

          vec2 diff = (uvCoord - uMouse);
          float dist = length(diff);
          float falloff = exp(-dist * 14.0);
          float ripple = sin(7.0 * dist - uTime * 2.0) * 0.02;
          uv += (diff / (dist + 0.0001)) * ripple * falloff;

          vec3 color = uBaseColor / max(0.08, abs(sin(uTime - uv.y - uv.x)));
          return vec4(color, 1.0);
      }

      void main() {
          gl_FragColor = renderImage(vUv);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([
            gl.canvas.width || 1,
            gl.canvas.height || 1,
            1,
          ]),
        },
        uBaseColor: { value: new Float32Array(baseColor) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
      },
      transparent: true,
    });
    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!container) return;
      const w = container.offsetWidth || window.innerWidth;
      const h = container.offsetHeight || window.innerHeight;
      // High-performance downscaled buffer for ambient liquid blur - cuts 75% GPU pixels
      const scale = typeof window !== "undefined" && window.innerWidth < 768 ? 0.45 : 0.55;
      const targetW = Math.max(1, Math.floor(w * scale));
      const targetH = Math.max(1, Math.floor(h * scale));
      renderer.setSize(targetW, targetH);
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.display = "block";
      gl.canvas.style.position = "absolute";
      gl.canvas.style.inset = "0";
      const resUniform = program.uniforms.uResolution.value as Float32Array;
      resUniform[0] = targetW;
      resUniform[1] = targetH;
      resUniform[2] = targetW / targetH;
    }
    window.addEventListener("resize", resize, { passive: true });
    resize();

    let mouseMoveTicking = false;
    function handleMouseMove(event: MouseEvent) {
      if (!container || mouseMoveTicking) return;
      mouseMoveTicking = true;
      window.requestAnimationFrame(() => {
        if (!container) {
          mouseMoveTicking = false;
          return;
        }
        const rect = container.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = 1 - (event.clientY - rect.top) / rect.height;
        const mouseUniform = program.uniforms.uMouse.value as Float32Array;
        mouseUniform[0] = x;
        mouseUniform[1] = y;
        mouseMoveTicking = false;
      });
    }

    function handleTouchMove(event: TouchEvent) {
      if (!container || event.touches.length === 0 || mouseMoveTicking) return;
      mouseMoveTicking = true;
      window.requestAnimationFrame(() => {
        if (!container || event.touches.length === 0) {
          mouseMoveTicking = false;
          return;
        }
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / rect.width;
        const y = 1 - (touch.clientY - rect.top) / rect.height;
        const mouseUniform = program.uniforms.uMouse.value as Float32Array;
        mouseUniform[0] = x;
        mouseUniform[1] = y;
        mouseMoveTicking = false;
      });
    }

    let animationId: number = 0;
    let isVisible = false;
    let isPageVisible = !document.hidden;
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let lastRenderTime = 0;
    const targetFps = 36; // 36 FPS gives fluid liquid motion while halving GPU workload
    const interval = 1000 / targetFps;

    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 120);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    function update(t: number) {
      if (!isVisible || !isPageVisible) return;
      animationId = requestAnimationFrame(update);
      // When user is actively scrolling, throttle shader to avoid frame drops
      if (isScrolling && t - lastRenderTime < 50) return;
      if (t - lastRenderTime < interval) return;
      lastRenderTime = t;
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
    }

    const startAnimation = () => {
      if (isVisible && isPageVisible && animationId === 0) {
        animationId = requestAnimationFrame(update);
      }
    };

    const stopAnimation = () => {
      if (animationId !== 0) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0 }
    );
    io.observe(container);

    const onVisChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };
    document.addEventListener("visibilitychange", onVisChange);

    startAnimation();
    container.appendChild(gl.canvas);

    return () => {
      stopAnimation();
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisChange);
      window.removeEventListener("resize", resize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchmove", handleTouchMove);
      }
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      style={style}
      {...props}
    />
  );
};

export default LiquidChrome;
