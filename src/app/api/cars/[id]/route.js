import { getAuthHeaders } from "@/lib/proxy-auth";
import { revalidatePath } from "next/cache";

const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const auth = await getAuthHeaders(request.headers);

    if (!auth) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${backendUrl}/cars/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...auth.internalHeaders,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch car details" }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching car details:", error);
    return Response.json({ error: "Failed to fetch car details" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const auth = await getAuthHeaders(request.headers);

    if (!auth) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${backendUrl}/cars/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...auth.internalHeaders,
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Failed to delete car" }));
      return Response.json(err, { status: res.status });
    }

    revalidatePath("/my-added-cars");
    revalidatePath("/explore-cars");
    return Response.json({ success: true });
  } catch (error) {
    console.error("API route error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const auth = await getAuthHeaders(request.headers);

    if (!auth) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const res = await fetch(`${backendUrl}/cars/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...auth.internalHeaders,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Failed to update car" }));
      return Response.json(err, { status: res.status });
    }

    const updatedCar = await res.json();
    revalidatePath("/my-added-cars");
    revalidatePath("/explore-cars");
    return Response.json(updatedCar);
  } catch (error) {
    console.error("API route error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
