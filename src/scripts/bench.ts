import { benchIndex } from '../lib/bench';

document.querySelectorAll('[data-bench]').forEach((root) => {
  const items = Array.from(
    root.querySelectorAll<HTMLElement>('[data-bench-item]'),
  );
  const selected = benchIndex(items.length);
  items.forEach((item, index) => {
    item.hidden = index !== selected;
  });
});
