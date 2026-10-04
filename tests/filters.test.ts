import test from 'node:test';
import assert from 'node:assert/strict';
import {
  readFilters,
  filterSearch,
  matchesFilters,
} from '../src/lib/filters.ts';
import {
  parseConsent,
  validMeasurementId,
  analyticsEvents,
} from '../src/lib/consent.ts';

test('filter state is URL-shareable, restores, and preserves unrelated parameters', () => {
  const search = filterSearch('?utm_source=friend', {
    tag: 'Boolean logic',
    status: 'Playable Demo',
  });
  assert.deepEqual(readFilters(search, ['tag', 'status', 'platform']), {
    tag: 'Boolean logic',
    status: 'Playable Demo',
    platform: '',
  });
  assert.ok(search.includes('utm_source=friend'));
  assert.equal(
    filterSearch(search, { tag: '', status: '' }),
    '?utm_source=friend',
  );
});
test('filters intersect fields; unavailable value has no results; archive opt-in', () => {
  const record = {
    status: ['Playable Demo'],
    platform: ['Browser'],
    tag: ['logic', 'simulation'],
  };
  assert.equal(
    matchesFilters(record, { platform: 'Browser', tag: 'logic' }),
    true,
  );
  assert.equal(
    matchesFilters(record, { platform: 'Windows', tag: 'logic' }),
    false,
  );
  assert.equal(matchesFilters({ status: ['Archived'] }, {}), false);
  assert.equal(
    matchesFilters({ status: ['Archived'] }, { archived: 'true' }),
    true,
  );
  assert.equal(
    matchesFilters({ status: ['Archived'] }, { status: 'Archived' }),
    true,
  );
  assert.equal(matchesFilters({ tag: ['journal'] }, { tag: 'journal' }), true);
});
test('consent is explicit and analytics ID is validated', () => {
  assert.equal(parseConsent(null), null);
  assert.equal(parseConsent('yes'), null);
  assert.equal(parseConsent('accepted'), 'accepted');
  assert.equal(parseConsent('declined'), 'declined');
  assert.equal(validMeasurementId(''), false);
  assert.equal(validMeasurementId('G-ABC1234567'), true);
  assert.equal(validMeasurementId('"><script>'), false);
  assert.equal(analyticsEvents.demo, 'try_demo');
});
