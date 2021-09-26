import React from "react";
import { gradient } from "../util/gradient";

// Inspiration: https://www.uplabs.com/posts/svg-gradient-wave-generator

export const Waves = ({
  width,
  height,
  waveCount,
  pulseWidth,
  amplitude,
  slope,
  offset,
  startColor,
  endColor,
}) => {
  const calculateAllWaves = () => {
    const waves = [];
    const colors = [];
    for (let i = 0; i < waveCount; i++) {
      const points = calculateWavePoints(i);
      waves.push(points);
      colors.push(gradient(startColor, endColor, i, waveCount + 1).toHSL());
    }
    // Make sure we have enough for the background too!
    colors.push(
      gradient(startColor, endColor, waveCount, waveCount + 1).toHSL()
    );
    return { waves, colors };
  };

  const overflow = offset * waveCount;

  const calculateWavePoints = (waveNumber) => {
    const startY = (height / waveCount) * waveNumber;
    let direction = false;

    let x = -overflow + offset * waveNumber;
    const points = [{ x, y: startY }];

    while (x < width) {
      x += pulseWidth;
      const y = amplitude * (direction ? 1 : -1) + startY;
      direction = !direction;
      points.push({ x, y });
    }

    points.push({ x: width + overflow, y: startY });

    return points;
  };

  const { waves, colors } = calculateAllWaves();

  const drawn = waves.map((points) => {
    let d = `M -${overflow} ${height + overflow}`;
    d += ` L ${points[0].x} ${points[0].y}`;

    // Curves - each half a wave
    for (let i = 1; i < points.length - 1; i++) {
      // Destination point
      const currentPoint = points[i];
      // Previous destination point
      const prevPoint = points[i - 1];

      // By using the same y, diff effectively determines slope of wave via control points
      const diff = (currentPoint.x - prevPoint.x) / slope;

      // Start of Bezier curve control point
      const x1 = prevPoint.x + diff;

      // End of Bezier curve control point
      const x2 = currentPoint.x - diff;

      d += ` C ${x1} ${prevPoint.y}, ${x2} ${currentPoint.y}, ${currentPoint.x} ${currentPoint.y}`;
    }
    d += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
    d += ` L ${width + overflow} ${height + overflow} Z`;

    return d;
  });

  return (
    <svg
      width={width / 2}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor: colors[0] }}
    >
      {drawn.map((d, i) => (
        <path d={d} fill={colors[i + 1]}>
          <animateMotion
            path="M0 0 H -400 0Z"
            dur="20s"
            repeatCount="indefinite"
          />
        </path>
      ))}
    </svg>
  );
};
