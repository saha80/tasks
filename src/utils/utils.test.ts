import { pathnameWithSearch } from './URL';
import { readAsDataURL } from './readAsDataURL';

describe('utils', () => {
  test('URL', () => {
    expect(pathnameWithSearch('path', {})).toBe('path?');
    expect(pathnameWithSearch('path', { a: 'b', c: 'd' })).toBe('path?a=b&c=d');
  });

  test('readAsDataURL', async () => {
    expect(await readAsDataURL(new Blob())).toBe(
      'data:application/octet-stream;base64,'
    );
  });
});
