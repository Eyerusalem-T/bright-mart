const PRODUCTS_URL = "https://fakestoreapi.com/products";

// Fetches the full product list from FakeStoreAPI.
// Throws on a non-2xx response so callers can show a real error state.
export async function fetchProducts() {
  const res = await fetch(PRODUCTS_URL);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
