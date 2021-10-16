import React from "react";
import { Waves } from "../components/Waves";
import { rand } from "../util/random";
import { Color } from "../util/color";

const TestPage = () => {
  // @todo Tweak colors and fix gradients for some pairings
  const startColor = Color.random(0, 359, 40, 100, 30, 40);
  const endColor = Color.random(
    Math.max(0, startColor.h - rand(5, 15)),
    Math.min(359, startColor.h + rand(5, 15)),
    70,
    90,
    60,
    75
  );
  const waveCount = rand(5, 9);
  const pulseWidth = rand(50, 90);
  const amplitude = rand(20, 40);
  const slope = rand(2, 4);
  const offset = rand(0, 30);

  return (
    <main>
      Waves
      <br />
      <Waves
        waveCount={waveCount}
        width={800}
        height={400}
        pulseWidth={pulseWidth}
        amplitude={amplitude}
        slope={slope}
        offset={offset}
        startColor={startColor}
        endColor={endColor}
      />
      <code>
        <br />
        WaveCount: {waveCount}
        <br /> PulseWidth: {pulseWidth}
        <br /> Amplitude: {amplitude}
        <br /> Slope: {slope}
        <br /> Offset: {offset}
        <br /> StartColor: {JSON.stringify(startColor)}
        <br />
        EndColor: {JSON.stringify(endColor)}
      </code>
    </main>
  );
};

export default TestPage;
