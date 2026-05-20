export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function apiFetch(path, options = {}) {
  const { headers, ...rest } = options;
  return fetch(`${API_URL}${path}`, {
    cache: "no-store",
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
