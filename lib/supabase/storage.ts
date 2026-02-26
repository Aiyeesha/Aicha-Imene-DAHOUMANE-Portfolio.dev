/**
 * Construit une URL publique Supabase Storage pour un bucket PUBLIC.
 * Exemple :
 *  https://xxxx.supabase.co/storage/v1/object/public/portfolio-assets/ltp-requirements.pdf
 */
export function getPublicStorageUrl(bucket: string, path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing.");
  }

  const cleanBucket = bucket.replace(/^\/+|\/+$/g, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${baseUrl}/storage/v1/object/public/${cleanBucket}/${cleanPath}`;
}