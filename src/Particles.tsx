import { useEffect, useRef } from "react";
import { useTheme } from "./theme";

// ── Color palette (Google brand) ──
const C1 = [66, 133, 244];
const C2 = [234, 67, 53];
const C3 = [52, 168, 83];

function blendColor(seed: number): string {
  const t = seed % 1;
  let r: number, g: number, b: number;
  if (t < 0.33) {
    const f = t / 0.33;
    r = C1[0] + (C2[0] - C1[0]) * f;
    g = C1[1] + (C2[1] - C1[1]) * f;
    b = C1[2] + (C2[2] - C1[2]) * f;
  } else if (t < 0.66) {
    const f = (t - 0.33) / 0.33;
    r = C2[0] + (C3[0] - C2[0]) * f;
    g = C2[1] + (C3[1] - C2[1]) * f;
    b = C2[2] + (C3[2] - C2[2]) * f;
  } else {
    const f = (t - 0.66) / 0.34;
    r = C3[0] + (C1[0] - C3[0]) * f;
    g = C3[1] + (C1[1] - C3[1]) * f;
    b = C3[2] + (C1[2] - C3[2]) * f;
  }
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let time = 0;
    let hoverProgress = 0;
    let centerX = width / 2;
    let centerY = height / 2;
    let driftAngle = Math.random() * Math.PI * 2;

    const mouse = { x: -9999, y: -9999, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    const DISC_RADIUS = Math.max(width, height) * 0.55;
    
    // Tốc độ sóng tỏa ra ngoài và khoảng cách giữa các vòng sóng
    const WAVE_SPEED = 0.3;
    const WAVE_WIDTH = 0.2;

    class Particle {
      refX: number;
      refY: number;
      x: number;
      y: number;
      scale: number;
      seed: number;
      phaseX: number;
      phaseY: number;
      freqX: number;
      freqY: number;
      ampX: number;
      ampY: number;
      length: number;
      baseAlpha: number;
      lifeEnd: number;
      color: string;

      constructor() {
        let rx: number, ry: number;
        do {
          rx = Math.random() * 2 - 1;
          ry = Math.random() * 2 - 1;
        } while (rx * rx + ry * ry > 1);
        this.refX = rx;
        this.refY = ry;
        this.x = rx;
        this.y = ry;
        this.scale = Math.random() * 0.5 + 0.3;
        this.seed = Math.random();
        this.phaseX = Math.random() * Math.PI * 2;
        this.phaseY = Math.random() * Math.PI * 2;
        this.freqX = Math.random() * 0.15 + 0.05;
        this.freqY = Math.random() * 0.15 + 0.05;
        this.ampX = Math.random() * 0.003 + 0.001;
        this.ampY = Math.random() * 0.003 + 0.001;
        this.length = Math.random() * 4 + 3;
        this.baseAlpha = Math.random() * 0.4 + 0.3;
        this.lifeEnd = 4 + Math.random() * 3;
        this.color = blendColor(this.seed);
      }

      update() {
        // ── Vòng đời (Scale) ──
        const lifeTime = ((this.seed * 100) + time * 0.3) % this.lifeEnd;
        const targetScale = smoothstep(0, 0.8, lifeTime) - smoothstep(0.5, 1, lifeTime / this.lifeEnd);
        this.scale += (targetScale - this.scale) * 0.05;

        // ── Drift chậm hữu cơ bằng sine (không rung giật) ──
        const driftX = Math.sin(time * this.freqX + this.phaseX) * this.ampX;
        const driftY = Math.cos(time * this.freqY + this.phaseY) * this.ampY;

        let targetX = this.refX + driftX;
        let targetY = this.refY + driftY;

        // ── Tương tác chuột (Bám hút nhẹ/Blend) ──
        if (mouse.active && hoverProgress > 0.01) {
          const mNormX = (mouse.x - centerX) / DISC_RADIUS;
          const mNormY = (mouse.y - centerY) / DISC_RADIUS;
          const dx = mNormX - this.refX;
          const dy = mNormY - this.refY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0.01 && dist < 0.8) {
            const blend = hoverProgress * hoverProgress * 0.25;
            targetX += dx * blend;
            targetY += dy * blend;
          }
        }

        // Cập nhật vị trí mô phỏng (smooth)
        this.x += (targetX - this.x) * 0.03;
        this.y += (targetY - this.y) * 0.03;
      }

      draw() {
        if (!ctx) return;

        // ── Tính toán sóng tỏa ra (Chỉ tính khi vẽ, không thay đổi vị trí thật) ──
        const cDist = Math.sqrt(this.x * this.x + this.y * this.y);
        const wavePhase = cDist - time * WAVE_SPEED;
        const ring = Math.sin((wavePhase / WAVE_WIDTH) * Math.PI * 2);
        const ringPositive = Math.max(0, ring);
        const edgeFade = smoothstep(1.0, 0.3, cDist);
        const pulseStrength = 0.005 + hoverProgress * 0.02; // Tăng biên độ khi hover
        const displacement = ringPositive * edgeFade * pulseStrength;

        // Vị trí vẽ thực tế sau khi bị đẩy bởi sóng tỏa ra
        const drawX = this.x * (1 + displacement);
        const drawY = this.y * (1 + displacement);

        const px = centerX + drawX * DISC_RADIUS;
        const py = centerY + drawY * DISC_RADIUS;

        if (px < -30 || px > width + 30 || py < -30 || py > height + 30) return;
        if (this.scale < 0.02) return;

        const angle = Math.atan2(drawY, drawX);
        const halfLen = this.length * this.scale;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(px - cosA * halfLen, py - sinA * halfLen);
        ctx.lineTo(px + cosA * halfLen, py + sinA * halfLen);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = Math.max(0.5, 1.2 * this.scale);
        ctx.lineCap = "round";
        ctx.globalAlpha = this.baseAlpha * Math.min(this.scale * 2, 1);
        ctx.stroke();
      }
    }

    const particles: Particle[] = [];
    const COUNT = Math.min(Math.floor((width * height) / 8000), 200);
    for (let i = 0; i < COUNT; i++) {
      particles.push(new Particle());
    }

    let lastTime = performance.now();
    let frameId: number;

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      time += dt;

      ctx.clearRect(0, 0, width, height);

      // Cập nhật hoverProgress
      const hoverTarget = mouse.active ? 1 : 0;
      hoverProgress += (hoverTarget - hoverProgress) * dt * 2;

      // Tâm di chuyển chậm theo chuột
      if (mouse.active) {
        centerX += (mouse.x - centerX) * 0.003;
        centerY += (mouse.y - centerY) * 0.003;
      } else {
        driftAngle += 0.002;
        const driftR = Math.min(width, height) * 0.06;
        const dtX = width / 2 + Math.cos(driftAngle) * driftR;
        const dtY = height / 2 + Math.sin(driftAngle * 0.7) * driftR * 0.5;
        centerX += (dtX - centerX) * 0.008;
        centerY += (dtY - centerY) * 0.008;
      }

      for (const p of particles) {
        p.update();
        p.draw();
      }

      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
    };
  }, [t.accent]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
