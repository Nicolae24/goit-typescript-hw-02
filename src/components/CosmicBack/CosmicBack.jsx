//

import { useEffect } from "react";
import s from "./CosmicBack.module.css";

const CosmicBack = () => {
  useEffect(() => {
    const canvas = document.getElementById("starsCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const stars = [];
    const shootingStars = [];
    const numStars = 200;
    const numShooting = 5;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.1 + 0.2,
        d: Math.random() * 0.5 + 0.05,
      });
    }

    for (let i = 0; i < numShooting; i++) {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2),
        length: Math.random() * 80 + 10,
        speed: Math.random() * 6 + 4,
        opacity: 0,
        fade: Math.random() * 0.01 + 0.005,
        active: false,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Малюємо статичні зірки
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.d})`;
        ctx.fill();
      });

      // Малюємо падаючі зірки
      shootingStars.forEach((star) => {
        if (!star.active && Math.random() < 0.005) star.active = true;

        if (star.active) {
          star.x += star.speed;
          star.y += star.speed;
          star.opacity += star.fade;

          if (star.opacity >= 1) star.fade = -star.fade;
          if (star.opacity <= 0) {
            star.active = false;
            star.opacity = 0;
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * (canvas.height / 2);
            star.speed = Math.random() * 6 + 4;
            star.length = Math.random() * 80 + 10;
            star.fade = Math.random() * 0.01 + 0.005;
          }

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.lineWidth = 2;
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - star.length, star.y - star.length);
          ctx.stroke();
        }
      });

      requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className={s.cosmicBg}>
      <svg
        className={s.nebula}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 600"
      >
        <defs>
          <radialGradient id="nebArg" cx="30%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#ff80ab" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#651fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nebBlue" cx="70%" cy="70%" r="50%">
            <stop offset="0%" stopColor="#40c4ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1a237e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="200" fill="url(#nebArg)" />
        <circle cx="400" cy="400" r="200" fill="url(#nebBlue)" />
      </svg>
      <canvas id="starsCanvas" className={s.canvas}></canvas>
    </div>
  );
};

export default CosmicBack;
