export function benchIndex(length: number, random = Math.random) {
  if (length < 1) return -1;
  return Math.min(length - 1, Math.max(0, Math.floor(random() * length)));
}
