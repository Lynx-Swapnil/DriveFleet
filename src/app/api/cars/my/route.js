export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";

  if (!authHeader) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${backendUrl}/cars/my`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader,
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
