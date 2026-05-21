// Use relative /api path on production, backend URL on localhost
export const API_URL = 
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
    : "/api";

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
