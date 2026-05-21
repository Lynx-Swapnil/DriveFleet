import { getAuthHeaders } from "@/lib/proxy-auth";

const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";

export async function POST(request) {
  try {
    const auth = await getAuthHeaders(request.headers);

    if (!auth) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const res = await fetch(`${backendUrl}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...auth.internalHeaders,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: "Failed to create booking" }));
      return Response.json(error, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error creating booking:", error);
    return Response.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
