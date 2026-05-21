export type Material = "gold" | "silver";
export type Source = "customer" | "workshop";

export type Artwork = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  material: Material;
  source: Source;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedArtworks = {
  data: Artwork[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type Stats = {
  total: number;
  gold: number;
  silver: number;
  customer: number;
  workshop: number;
};

export type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};
