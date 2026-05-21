import { getAuthHeaders } from "@/lib/proxy-auth";

const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const auth = await getAuthHeaders(request.headers);

    if (!auth) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${backendUrl}/bookings/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...auth.internalHeaders,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch bookings" }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return Response.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const auth = await getAuthHeaders(request.headers);

    if (!auth) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${backendUrl}/bookings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...auth.internalHeaders,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: "Failed to delete booking" }));
      return Response.json(error, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error deleting booking:", error);
    return Response.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
