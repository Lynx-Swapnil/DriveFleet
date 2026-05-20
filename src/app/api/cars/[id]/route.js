import { apiFetch } from "@/lib/api";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Get token from request
    const { token } = await auth.api.getToken({
      headers: request.headers,
    });

    if (!token) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Forward the DELETE request to the external API
    const res = await apiFetch(`/cars/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Failed to delete car" }));
      return Response.json(
        err,
        { status: res.status }
      );
    }

    revalidatePath("/my-added-cars");
    revalidatePath("/explore-cars");
    return Response.json({ success: true });
  } catch (error) {
    console.error("API route error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    // Get token from request
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

    // Forward the PATCH request to the external API
    const res = await apiFetch(`/cars/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Failed to update car" }));
      return Response.json(
        err,
        { status: res.status }
      );
    }

    const updatedCar = await res.json();
    revalidatePath("/my-added-cars");
    revalidatePath("/explore-cars");
    return Response.json(updatedCar);
  } catch (error) {
    console.error("API route error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
