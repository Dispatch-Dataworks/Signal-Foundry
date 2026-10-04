export type FilterRecord = Record<string, string[]>;
export type FilterState = Record<string, string>;

export function readFilters(search: string, keys: string[]) {
  const params = new URLSearchParams(search);
  return Object.fromEntries(keys.map((key) => [key, params.get(key) ?? '']));
}

export function filterSearch(search: string, state: FilterState) {
  const params = new URLSearchParams(search);
  for (const [key, value] of Object.entries(state)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  const result = params.toString();
  return result ? `?${result}` : '';
}

export function matchesFilters(record: FilterRecord, state: FilterState) {
  const archived = record.status?.includes('Archived') ?? false;
  if (archived && state.archived !== 'true' && state.status !== 'Archived')
    return false;
  return Object.entries(state).every(
    ([key, value]) =>
      key === 'archived' || !value || (record[key] ?? []).includes(value),
  );
}
