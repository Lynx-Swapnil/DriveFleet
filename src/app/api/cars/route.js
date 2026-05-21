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
