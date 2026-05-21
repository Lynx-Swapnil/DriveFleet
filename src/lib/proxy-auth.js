import { auth } from "@/lib/auth";

/**
 * Gets the authenticated user from the request session.
 * Returns { user, internalHeaders } on success, or null if not authenticated.
 *
 * internalHeaders contains x-internal-key and x-user-id to be forwarded
 * to the Express backend for auth verification.
 */
export async function getAuthHeaders(requestHeaders) {
  try {
    const session = await auth.api.getSession({ headers: requestHeaders });
    if (!session?.user?.id) return null;

    return {
      user: session.user,
      internalHeaders: {
        "x-internal-key": process.env.INTERNAL_API_KEY,
        "x-user-id": session.user.id,
        "x-user-email": session.user.email || "",
      },
    };
  } catch {
    return null;
  }
}
