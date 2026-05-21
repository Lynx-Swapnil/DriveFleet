export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";

  try {
    const endpoint = search
      ? `${backendUrl}/cars/search?search=${encodeURIComponent(search)}`
      : `${backendUrl}/cars`;

    const res = await fetch(endpoint, {
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
    console.error("Error searching cars:", error);
    return Response.json(
      { error: "Failed to search cars" },
      { status: 500 }
    );
  }
}
