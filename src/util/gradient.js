import { Color } from "./color";

export const gradient = (start, end, current, max) => {
  const percent = current / max;
  const h = start.h + percent * (end.h - start.h);
  const s = start.s + percent * (end.s - start.s);
  const l = start.l + percent * (end.l - start.l);
  return new Color(h, s, l);
};
