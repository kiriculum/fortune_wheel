/// <reference types="vite/client" />

import React, { useEffect, useState } from "react";

type SpinStyle = {
  transform: string;
  animationName?: string;
  animationDuration?: string;
  animationIterationCount?: number;
  animationTimingFunction?: string;
};

let angle = 0;
const rps = 1;

const style = document.createElement("style");
document.getElementsByTagName("head")[0].appendChild(style);

function spin(from: number, to: number) {
  const keyFrames = `@keyframes spin {
    from {transform:rotate(A_DYNAMIC_VALUE);}
    to {transform:rotate(B_DYNAMIC_VALUE);}
  }`;

  style.innerHTML = keyFrames
    .replace(/A_DYNAMIC_VALUE/g, `${from}deg`)
    .replace(/B_DYNAMIC_VALUE/g, `${to}deg`);
}

let timeout: ReturnType<typeof setTimeout>;

export function Wheel() {
  const [ttr, setTtr] = useState(0);
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState('')

  async function onClick() {
    const data = new FormData();
    data.append("start_angle", String(angle));
    const response = await fetch("spin/", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    const res = await response.json();

    setSpinning(true)
    setResult(res.result);
    spin(angle, res.rotate + angle);
    angle = (res.rotate + angle) % 360;

    const ttr = (Math.floor((res.rotate / 360 / rps) * 1000));
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => setSpinning(false), ttr)

    setTtr(ttr)
  }

  useEffect(() => {
    if (!ttr) return;
    const timeout = setTimeout(() => {
      setTtr(0);
    }, ttr);
    return () => clearTimeout(timeout);
  });

  let spinStyle: SpinStyle = {
    transform: `rotate(${angle}deg)`,
    animationName: "spin",
    animationDuration: `${ttr}ms`,
    animationIterationCount: 1,
    animationTimingFunction: "linear",
  };

  if (!ttr)
    spinStyle = {
      transform: `rotate(${angle}deg)`,
    };

  return (
    <div className="flex flex-col gap-2 justify-center items-center p-2 pt-6">
      <button onClick={onClick} className="btn">
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
