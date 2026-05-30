"use client";

import React, { useEffect, useRef } from 'react';

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  // Pseudo-random helper
  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // Very fast 2D Noise
  float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(a, b, u.x) +
             (c - a) * u.y * (1.0 - u.x) +
             (d - b) * u.x * u.y;
  }

  // Fractal Brownian Motion
  float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      vec2 shift = vec2(100.0);
      // Rotation matrix to reduce axial bias
      float c = 0.87758256189; // cos(0.5)
      float s = 0.4794255386;  // sin(0.5)
      mat2 rot = mat2(c, s, -s, c);
      for (int i = 0; i < 5; ++i) {
          value += amplitude * noise(st);
          st = rot * st * 2.0 + shift;
          amplitude *= 0.5;
      }
      return value;
  }

  void main() {
      vec2 res = max(u_resolution.xy, vec2(1.0));
      // Normalize UV to [0.0, 1.0] and correct aspect ratio
      vec2 uv = gl_FragCoord.xy / res;
      vec2 aspectUv = uv;
      aspectUv.x *= res.x / res.y;

      // --- FLUTED GLASS GEOMETRY ---
      // Density of the vertical ridges
      float numRidges = res.x * 0.03; // Even wider
      numRidges = clamp(numRidges, 10.0, 60.0);

      // Slow horizontal drift of the ridges themselves — keeps the glass feeling alive
      float ridgeDrift = u_time * 0.005;
      // Add a tiny bit of noise to make them feel slightly organic, almost imperceptible
      float ridgePos = fract(uv.x * numRidges + ridgeDrift + noise(vec2(uv.y * 5.0, 0.0)) * 0.05);
      
      // Calculate local X across the single ridge (-1 to 1)
      float nx = (ridgePos - 0.5) * 2.0; 
      
      // Calculate normal Z to form a rounded/semi-circular cross-section
      float nz = sqrt(max(0.0, 1.0 - nx*nx)); 
      vec3 normal = normalize(vec3(nx, 0.0, nz));

      // --- GLASS REFRACTION DISTORTION ---
      // Because glass bends light, the deeper the normal angle, the more horizontally shifted the UV
      float ior = 0.015; // Index of refraction distortion strength
      vec2 refractedUv = uv;
      refractedUv.x -= normal.x * ior;
      
      // --- BACKGROUND FLUID / COLORS ---
      // The background looks like deeply stretched vertical fluid colors
      vec2 fluidUv = refractedUv;
      fluidUv.x *= 1.5; 
      fluidUv.y *= 0.15; // heavily stretch vertically
      
      // Constant drift upwards and sideways, entirely non-interactive
      fluidUv.x -= u_time * 0.012;
      fluidUv.y -= u_time * 0.03;

      // Base organic movement
      float n1 = fbm(fluidUv * 2.0 + fbm(fluidUv * 4.0));
      float n2 = fbm(fluidUv * 4.0 - u_time * 0.02);
      
      // Monochrome light color palette
      vec3 darkTone = vec3(0.75);
      vec3 deepTone = vec3(0.85);
      vec3 midTone = vec3(0.95);
      vec3 lightTone = vec3(1.0);
      vec3 accentTone = vec3(0.65);
      
      // Layering the colors based on noise
      vec3 color = mix(darkTone, deepTone, n1 * 1.5);
      color = mix(color, midTone, smoothstep(0.3, 0.8, n2));
      
      // Create strong highly contrasted vertical bright streaks
      float streakNoise = fbm(vec2(refractedUv.x * 20.0, u_time * 0.04));
      float streak = smoothstep(0.6, 1.0, streakNoise);
      color = mix(color, lightTone, streak * 0.8);
      
      // Extreme white blowout area matching right edge of reference
      float rightGlowArea = smoothstep(0.6, 1.0, uv.x) * smoothstep(0.2, 0.8, fbm(fluidUv*3.0));
      color = mix(color, vec3(1.0), rightGlowArea * 0.95);
      
      // Add subtle darker spot near bottom left instead of "warm spot"
      float distAccent = distance(refractedUv, vec2(0.2, 0.1));
      float accentIntensity = smoothstep(0.3, 0.0, distAccent) * (0.4 + 0.6 * n1);
      color = mix(color, accentTone, accentIntensity * 1.2);

      // --- SHADING / LIGHTING BEHIND THE GLASS ---
      // Fixed light direction so fluted panels are not interactive
      vec3 lightDir = normalize(vec3(0.3, 0.5, 1.0));
      
      // Diffuse lighting on the rounded fluted surface
      float diffuse = max(dot(normal, lightDir), 0.0);
      
      // Specular highlight focusing on the ridge crests
      float specular = pow(max(dot(normal, lightDir), 0.0), 48.0);
      
      // Fake ambient occlusion / shadow in the deeper crevices
      float crevice = smoothstep(1.0, 0.96, abs(nx)); 
      
      // Composite the lighting over the fluid color
      color = color * (0.85 + 0.15 * diffuse); 
      color += vec3(1.0) * specular * crevice; // Bright specular highlights for glass
      
      // Deepen the shadows in the gaps between ridges (make the gap line very fine and thin)
      float fineJoint = smoothstep(1.0, 0.98, abs(nx));
      color *= mix(0.75, 1.0, fineJoint); // Muted joint shadows for light mode

      gl_FragColor = vec4(color, 1.0);
  }
`;

export const FlutedGlass: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use WebGL context (works universally)
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Helper to compile shaders
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = gl.createProgram();

    if (!program || !vShader || !fShader) return;

    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full screen quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    let animationFrameId: number;
    let mouseX = 0.5;
    let mouseY = 0.5;

    // Interactive mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Handle high-dpi responsive sizing
    const resize = () => {
      const displayWidth = canvas.clientWidth || window.innerWidth;
      const displayHeight = canvas.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at dpr 2 for performance

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener('resize', resize);
    resize();

    const startTime = Date.now();

    const render = () => {
      // It's generally safe and cheap to call viewport resize check every frame in pure WebGL for buttery window snaps
      resize();
      
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, (Date.now() - startTime) / 1000.0);
      gl.uniform2f(mouseLocation, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full object-cover block bg-white z-0 pointer-events-none"
    />
  );
};
