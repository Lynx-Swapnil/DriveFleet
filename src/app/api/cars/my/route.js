import { getAuthHeaders } from "@/lib/proxy-auth";

const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";

export async function GET(request) {
  try {
    const auth = await getAuthHeaders(request.headers);

    if (!auth) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${backendUrl}/cars/my`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...auth.internalHeaders,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch cars" }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching user cars:", error);
    return Response.json({ error: "Failed to fetch cars" }, { status: 500 });
  }
}
