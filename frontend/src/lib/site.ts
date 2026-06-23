/** Public site URL — set NEXT_PUBLIC_SITE_URL in Vercel for production. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://gold-silver-five.vercel.app";

export const siteName = "SHRI JAGANMATHE";
export const siteTagline = "Gold & Silver Artwork";

export const seoKeywords = [
  "Jaganmathe gold and silver artwork",
  "Shri Jaganmathe",
  "Jaganmathe gold",
  "Jaganmathe silver",
  "gold and silver artwork",
  "gold artwork Udupi",
  "silver artwork Karnataka",
  "handcrafted gold jewellery",
  "silver artistry workshop",
] as const;

export const defaultDescription =
  "SHRI JAGANMATHE — Jaganmathe gold and silver artwork workshop in Udupi, Karnataka. Explore handcrafted gold works, silver artistry, custom commissions, and our gallery.";

export const business = {
  phone: "+917996587096",
  phoneDisplay: "+91 7996587096",
  email: "rohithacharya110@gmail.com",
  address: {
    street: "Rajacharya Marg, 1st Cross, Karamballi",
    city: "Udupi",
    region: "Karnataka",
    postalCode: "576102",
    country: "IN",
  },
} as const;
