import React from "react";

import style from "./index.module.scss";

const IsLoading: React.FC = () => {
  const canvasRef = React.useRef<any>();
  const cw = React.useRef<number>(0);
  const ch = React.useRef<number>(0);
  const particles = React.useRef<{ x: number; y: number }[]>([]);
  const t = React.useRef<GLfloat>(0);
  const anima = React.useRef<number>();

  React.useEffect(() => {
    const handleResizeCanvas = () => {
      cw.current = canvasRef.current.width = canvasRef.current.offsetWidth;
      ch.current = canvasRef.current.height = canvasRef.current.offsetHeight;
    };
    window.addEventListener("resize", handleResizeCanvas);
    return () => {
      window.removeEventListener("resize", handleResizeCanvas);
    };
  }, []);

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    cw.current = canvasRef.current.width = canvasRef.current.offsetWidth;
    ch.current = canvasRef.current.height = canvasRef.current.offsetHeight;

    t.current = 0;
    particles.current = [];
    anima.current && cancelAnimationFrame(anima.current);
    create_dot();
    create_chart(ctx);
  }, [cw.current]);

  const create_dot = () => {
    for (let i = 0; i < 1600; i += 10) {
      let x = 16 * Math.pow(Math.sin(i), 3) * (cw.current * 0.015);
      let y =
        (13 * Math.cos(i) -
          5 * Math.cos(2 * i) -
          2 * Math.cos(3 * i) -
          Math.cos(4 * i)) *
        (cw.current * 0.015);
      particles.current.push({ x, y });
    }
  };

  const clear = (ctx: any) => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, cw.current, ch.current);
  };

  const create_chart = (ctx: any) => {
    let ox = cw.current / 2;
    let oy = ch.current / 2.5;

    clear(ctx);
    t.current += 0.1;

    for (let i = 0; i < particles.current.length; i += 1) {
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(
        ox + particles.current[i].x,
        oy - particles.current[i].y - 10 * Math.sin(t.current * i)
      );
      const color = (60 * Math.sin(t.current * 5) + 250) % 360;
      ctx.strokeStyle = `hsl(${color}, 100%, 50%)`;
      ctx.stroke();
    }

    anima.current = requestAnimationFrame(() => create_chart(ctx));
  };

  return (
    <div className={style.root}>
      <canvas ref={canvasRef} className={style.canvas}></canvas>
    </div>
  );
};

export default IsLoading;
