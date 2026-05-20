import { apiFetch } from "@/lib/api";
import { auth } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Try to get token if user is authenticated
    let res;
    try {
      const { token } = await auth.api.getToken({
        headers: request.headers,
      });

      if (token) {
        // If authenticated, fetch with auth
        res = await apiFetch(`/cars/${id}`, {
          headers: { authorization: `Bearer ${token}` },
        });
      } else {
        // If not authenticated, fetch without auth
        res = await apiFetch(`/cars/${id}`);
      }
    } catch (error) {
      // If token check fails, try without token
      res = await apiFetch(`/cars/${id}`);
    }

    if (!res.ok) {
      // If /cars/{id} fails, try fetching all cars and filtering
      const allCarsRes = await apiFetch(`/cars`);
      
      if (!allCarsRes.ok) {
        return Response.json(
          { error: "Failed to fetch car" },
          { status: 404 }
        );
      }

      const cars = await allCarsRes.json();
      const car = Array.isArray(cars)
        ? cars.find((c) => c._id === id)
        : null;

      if (!car) {
        return Response.json(
          { error: "Car not found" },
          { status: 404 }
        );
      }

      return Response.json(car);
    }

    const car = await res.json();
    return Response.json(car);
  } catch (error) {
    console.error("API route error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
