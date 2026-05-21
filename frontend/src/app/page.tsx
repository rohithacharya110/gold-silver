import { HomeHeroSplit } from "@/components/home/HomeHeroSplit";
import { HomeMarquee } from "@/components/home/HomeMarquee";
import { HomeCategories } from "@/components/home/HomeCategories";
import { HomeGalleryPreview } from "@/components/home/HomeGalleryPreview";
import { HomeTestimonial } from "@/components/home/HomeTestimonial";
import { HomeContactStrip } from "@/components/home/HomeContactStrip";
import { apiBase } from "@/lib/api";
import type { Artwork, PaginatedArtworks } from "@/lib/types";

/** Pull every artwork (gold & silver); API caps at 48 per page — walk pages until done. */
async function fetchAllArtworks(): Promise<Artwork[]> {
  try {
    const merged: Artwork[] = [];
    let page = 1;
    const limit = 48;
    let totalPages = 1;

    const base = apiBase();

    do {
      const res = await fetch(`${base}/artworks?limit=${limit}&page=${page}`, {
        next: { revalidate: 30 },
      });
      if (!res.ok) break;
      const json = (await res.json()) as PaginatedArtworks;
      merged.push(...(json.data ?? []));
      totalPages = json.totalPages ?? 1;
      page += 1;
    } while (page <= totalPages && page <= 50);

    merged.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return merged;
  } catch {
    return [];
  }
}

export default async function Home() {
  const artworks = await fetchAllArtworks();
  const featuredPreview = artworks.slice(0, 12);

  return (
    <>
      <HomeHeroSplit />
      <HomeMarquee />
      <HomeCategories artworks={artworks} />
      <HomeGalleryPreview items={featuredPreview} />
      <HomeTestimonial />
      <HomeContactStrip />
    </>
  );
}
