import React from "react";
import { Waves } from "../components/Waves";
import { rand } from "../util/random";
import { Color } from "../util/color";

const IndexPage = () => {
  // @todo Figure out best random val ranges
  // @todo Tweak colors and fix gradients for some pairings
  const startColor = Color.random(0, 359, 20, 100, 30, 40);
  const endColor = Color.random(
    Math.max(0, startColor.h - rand(5, 60)),
    Math.min(359, startColor.h + rand(5, 60)),
    70,
    90,
    70,
    85
  );

  return (
    <main>
      Waves
      <br />
      <Waves
        waveCount={rand(6, 9)}
        width={800}
        height={400}
        pulseWidth={rand(60, 90)}
        amplitude={rand(20, 40)}
        slope={rand(2, 4)}
        offset={rand(0, 20)}
        startColor={startColor}
        endColor={endColor}
      />
    </main>
  );
};

export default IndexPage;
