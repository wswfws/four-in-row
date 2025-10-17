export default function Range(start: number, end: number, step = 1) {
  return Array.from({length: Math.floor((end - start) / step)}, (_, i) => start + i * step);
}