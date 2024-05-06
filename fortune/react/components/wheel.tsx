/// <reference types="vite/client" />

import React, { useEffect, useState } from "react";

const rps = 1;
let timeout: ReturnType<typeof setTimeout>;

type SpinStyle = {
  transform: string;
  transitionDuration?: string;
};

export function Wheel() {
  const [ttr, setTtr] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState("");

  async function onClick() {
    const data = new FormData();
    data.append("start_angle", String(angle));
    const response = await fetch("spin/", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    const res = await response.json();

    const ttr = Math.floor((res.rotate / 360 / rps) * 1000);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSpinning(false);
      setAngle((v) => v % 360);
    }, ttr);

    setSpinning(true);
    setResult(res.result);
    setAngle(res.rotate + angle);
    setTtr(ttr);
  }

  useEffect(() => {
    if (!ttr) return;
    const timeout = setTimeout(() => {
      setTtr(0);
    }, ttr);
    return () => clearTimeout(timeout);
  });

  const spinStyle: SpinStyle = {
    transform: `rotate(${angle}deg)`,
    transitionDuration: `${ttr}ms`,
  };

  if (!spinning) delete spinStyle.transitionDuration;

  return (
    <div className="flex flex-col gap-2 justify-center items-center p-2 pt-6">
      <button disabled={spinning} onClick={onClick} className="btn">
        Spin The Wheel!
      </button>
      <div>Your result: {!spinning && result}</div>
      <div>&darr;</div>
      <img
        className="w-[20rem]"
        style={spinStyle}
        src="/static/fortune/wheel.png"
      ></img>
    </div>
  );
}
