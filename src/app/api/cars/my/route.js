import { auth } from "@/lib/auth";

export async function GET(request) {
  const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";

  try {
    const { token } = await auth.api.getToken({
      headers: request.headers,
    });

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${backendUrl}/cars/my`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
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
    console.error("Error fetching user cars:", error);
    return Response.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}
