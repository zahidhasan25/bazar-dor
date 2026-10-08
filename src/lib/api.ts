const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type ProductChange = {
  dir: "up" | "down" | "flat";
  pct: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: "kg" | "litre" | "dozen" | "piece";
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: ProductChange;
  markets: Market[];
};

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`Products API failed: ${response.status}`);
  }

  return response.json();
}

export async function getProduct(
  slug: string,
): Promise<Product | undefined> {
  const products = await getProducts();

  return products.find((product) => product.slug === slug);
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const products = await getProducts();

  return products.filter((product) => product.category === category);
}