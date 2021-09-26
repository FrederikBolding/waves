import { rand } from "./random";

// Borrowed from: https://github.com/mikker/cranes/blob/main/pages/tester.js

export class Color {
  constructor(h, s, l) {
    this.h = h;
    this.s = s;
    this.l = l;
  }

  toHSL() {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
  }
}

Color.random = function (hMin, hMax, sMin, sMax, lMin, lMax) {
  return new Color(rand(hMin, hMax), rand(sMin, sMax), rand(lMin, lMax));
};
