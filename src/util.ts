export function getAssetPath(path: string): string {
  const prefix = import.meta.env.PROD ? "" : ".vercel/output/static";
  return `${prefix}${path}`;
}
