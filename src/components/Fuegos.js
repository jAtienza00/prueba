import { useEffect, useRef } from "react";

const FireworksCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Ajuste al redimensionar
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    // Firework particle
    const particles = [];
    const colors = ["#ff4b4b", "#ffd93d", "#4bffb1", "#4b7bff", "#ff4bf2", "#ffffff"];

    class Particle {
      constructor(x, y, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.alpha = 1;
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;
        this.dy += 0.02; // gravedad
        this.alpha -= 0.01;
      }

      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const createFirework = () => {
      const x = Math.random() * width;
      const y = Math.random() * height * 0.5;

      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particles.push(
          new Particle(
            x,
            y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            colors[Math.floor(Math.random() * colors.length)]
          )
        );
      }
    };

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      if (frame % 60 === 0) createFirework(); // uno por segundo

      particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(index, 1);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}
    />
  );
};

export default FireworksCanvas;
