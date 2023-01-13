import React from "react";

import style from "./index.module.scss";

const HeartLoading: React.FC = () => {
  const canvasRef = React.useRef<any>();
  const cw = React.useRef<number>(0);
  const ch = React.useRef<number>(0);
  const t = React.useRef<GLfloat>(0);
  const anima = React.useRef<number>();
  const size = 5;
  const scale = 1.2;

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
    anima.current && cancelAnimationFrame(anima.current);
    create_chart(ctx);
  }, [cw.current]);

  const clear = (ctx: any) => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, cw.current, ch.current);
  };

  const create_chart = (ctx: any) => {
    let ox = cw.current / 2;
    let oy = ch.current / 2.5;

    clear(ctx);

    t.current += 0.03;

    for (let i = 0; i < 6.2; i += 0.01) {
      let x =
        16 * scale * Math.pow(Math.sin(i * Math.sin(t.current)), 3) * size;
      let y =
        (13 * scale * Math.cos(i * Math.sin(t.current)) -
          5 * scale * Math.cos(2 * i * Math.sin(t.current)) -
          2 * scale * Math.cos(3 * i * Math.sin(t.current)) -
          Math.cos(4 * i * Math.sin(t.current))) *
        size;

      ctx.beginPath();
      ctx.arc(ox + x, oy - y, 2, 0, 2 * Math.PI);

      const color = (60 * Math.sin(t.current * i) + 300) % 360;
      ctx.fillStyle = `hsl(${color}, 100%, 50%)`;
      ctx.fill();
    }

    anima.current = requestAnimationFrame(() => create_chart(ctx));
  };

  return (
    <div className={style.root}>
      <canvas ref={canvasRef} className={style.canvas}></canvas>
    </div>
  );
};

export default HeartLoading;
