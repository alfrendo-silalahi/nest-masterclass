import slugify from 'slugify';

export function generateSlug(string: string): string {
  return slugify(string, {
    replacement: '-',
    strict: true,
    lower: true,
    trim: true,
  });
}
