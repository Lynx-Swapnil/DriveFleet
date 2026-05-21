import { auth } from "@/lib/auth";

export async function GET(request) {
  const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";

  try {
    const res = await fetch(`${backendUrl}/cars`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch cars" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return Response.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { token } = await auth.api.getToken({
      headers: request.headers,
    });

    if (!token) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";

    const res = await fetch(`${backendUrl}/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
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
    return Response.json(
      { error: "Failed to add car" },
      { status: 500 }
    );
  }
}
