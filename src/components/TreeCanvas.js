import React, { useEffect, useRef } from 'react';

const TreeCanvas = () => {
  const canvasRef = useRef(null);
  let treeImage = null;
  let animationFrameId = null;
  const fallingHearts = [];

  class FallingHeart {
    constructor(x, y, scale) {
      this.x = x;
      this.y = y;
      this.scale = scale;
      this.speedY = Math.random() * 0.5 + 0.2;
      this.speedX = Math.random() * 1 + 0.5;
      this.amplitude = Math.random() * 20 + 10;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = Math.random() * 0.05 + 0.02;
      this.colors = ['#e60026', '#ff4d6d', '#ff66b2'];
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x -= this.speedX;
      this.angle += this.angleSpeed;
      this.x += Math.sin(this.angle) * 0.5;
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.scale, this.scale);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -10, -10, -10, -10, 0);
      ctx.bezierCurveTo(-10, 10, 0, 15, 0, 20);
      ctx.bezierCurveTo(0, 15, 10, 10, 10, 0);
      ctx.bezierCurveTo(10, -10, 0, -10, 0, 0);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function drawBranch(ctx, x, y, length, angle, width, depth, baseScale) {
    if (depth === 0) {
      drawHeartLeaf(ctx, x, y, baseScale);
      return;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);

    const newX = x + length * Math.cos(angle);
    const newY = y + length * Math.sin(angle);

    ctx.lineTo(newX, newY);
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = width;
    ctx.stroke();

    const nextWidth = width * 0.7;
    const nextLength = length * 0.75;
    const spread = Math.PI / 6;

    drawBranch(ctx, newX, newY, nextLength, angle - spread, nextWidth, depth - 1, baseScale);
    drawBranch(ctx, newX, newY, nextLength, angle + spread, nextWidth, depth - 1, baseScale);

    if (Math.random() < 0.6) {
      drawBranch(ctx, newX, newY, nextLength, angle, nextWidth, depth - 1, baseScale);
    }
  }

  function drawHeartLeaf(ctx, x, y, baseScale) {
    ctx.save();
    ctx.translate(x, y);
    const scale = baseScale * (Math.random() * 0.4 + 0.3);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -10, -10, -10, -10, 0);
    ctx.bezierCurveTo(-10, 10, 0, 15, 0, 20);
    ctx.bezierCurveTo(0, 15, 10, 10, 10, 0);
    ctx.bezierCurveTo(10, -10, 0, -10, 0, 0);

    const colors = ['#e60026', '#ff4d6d', '#ff66b2'];
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fill();
    ctx.restore();
  }

  function drawTreeToImage(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const baseLength = canvas.height * 0.2;
    const baseWidth = canvas.width * 0.015;
    const baseScale = Math.min(canvas.width, canvas.height) / 300;
    let depth = 10;
    if (canvas.width < 500) depth = 7;
    if (canvas.width < 350) depth = 5;

    drawBranch(ctx, canvas.width / 2, canvas.height, baseLength, -Math.PI / 2, baseWidth, depth, baseScale);

    treeImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  const animate = (ctx, canvas) => {
    ctx.putImageData(treeImage, 0, 0);

    fallingHearts.forEach((heart, index) => {
      heart.update();
      heart.draw(ctx);

      if (heart.x < -30 || heart.y > canvas.height + 30) {
        fallingHearts.splice(index, 1);
      }
    });

    animationFrameId = requestAnimationFrame(() => animate(ctx, canvas));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvasAndTree = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      drawTreeToImage(ctx, canvas);
    };

    resizeCanvasAndTree();

    window.addEventListener('resize', resizeCanvasAndTree);

    const intervalId = setInterval(() => {
      const startX = canvas.width / 2 + (Math.random() * 100 - 50);
      const startY = canvas.height * 0.2 + Math.random() * 50 + Math.random() * 80;
      const scale = Math.min(canvas.width, canvas.height) / 300 * (Math.random() * 0.6 + 0.3);
      fallingHearts.push(new FallingHeart(startX, startY, scale));
    }, 2000);

    animate(ctx, canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvasAndTree);
      clearInterval(intervalId);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: 'auto',
        aspectRatio: '1200 / 800',
        borderRadius: '8px',
        display: 'block',
      }}
    />
  );
};

export default TreeCanvas;
