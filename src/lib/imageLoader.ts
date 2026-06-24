const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function img(src: string): string {
  if (src.startsWith('http') || src.startsWith(BASE_PATH)) return src;
  return `${BASE_PATH}${src}`;
}
