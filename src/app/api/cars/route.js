import { getAuthHeaders } from "@/lib/proxy-auth";

const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";

export async function GET(request) {
  try {
    const res = await fetch(`${backendUrl}/cars`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch cars" }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return Response.json({ error: "Failed to fetch cars" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const auth = await getAuthHeaders(request.headers);

    if (!auth) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const res = await fetch(`${backendUrl}/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...auth.internalHeaders,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: "Failed to add car" }));
      return Response.json(error, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error adding car:", error);
    return Response.json({ error: "Failed to add car" }, { status: 500 });
  }
}
