import { readFilters, filterSearch, matchesFilters } from '../lib/filters';
import type { FilterRecord } from '../lib/filters';

document.querySelectorAll<HTMLElement>('[data-filter-root]').forEach((root) => {
  const form = root.querySelector<HTMLFormElement>('[data-filters]');
  if (!form) return;
  const controls = Array.from(
    form.querySelectorAll<HTMLSelectElement | HTMLInputElement>(
      'select[name], input[name]',
    ),
  );
  const keys = controls.map((control) => control.name);
  const items = Array.from(
    root.querySelectorAll<HTMLElement>('[data-filter-item]'),
  );
  const records = items.map(
    (item) => JSON.parse(item.dataset.filters ?? '{}') as FilterRecord,
  );
  function apply(fromUrl = false) {
    if (fromUrl) {
      const state = readFilters(location.search, keys);
      controls.forEach((control) => {
        if (
          control instanceof HTMLInputElement &&
          control.type === 'checkbox'
        ) {
          control.checked = state[control.name] === 'true';
        } else {
          const value = state[control.name];
          if (
            control instanceof HTMLSelectElement &&
            !Array.from(control.options).some(
              (option) => option.value === value,
            ) &&
            value
          ) {
            const option = new Option(`${value} (unavailable)`, value);
            control.add(option);
          }
          control.value = value;
        }
      });
    }
    const state = Object.fromEntries(
      controls.map((control) => [
        control.name,
        control instanceof HTMLInputElement && control.type === 'checkbox'
          ? control.checked
            ? 'true'
            : ''
          : control.value,
      ]),
    );
    let count = 0;
    items.forEach((item, index) => {
      item.hidden = !matchesFilters(records[index], state);
      if (!item.hidden) count++;
    });
    const countElement = root.querySelector('[data-filter-count]');
    if (countElement)
      countElement.textContent = `${count} ${count === 1 ? 'result' : 'results'}`;
    const empty = root.querySelector<HTMLElement>('[data-filter-empty]');
    if (empty) empty.hidden = count !== 0;
    if (!fromUrl) {
      const search = filterSearch(location.search, state);
      if (search !== location.search)
        history.pushState(
          null,
          '',
          `${location.pathname}${search}${location.hash}`,
        );
    }
  }
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('change', () => apply());
  root.querySelector('[data-filter-reset]')?.addEventListener('click', () => {
    controls.forEach((control) => {
      if (control instanceof HTMLInputElement && control.type === 'checkbox')
        control.checked = false;
      else control.value = '';
    });
    apply();
  });
  window.addEventListener('popstate', () => apply(true));
  apply(true);
});
