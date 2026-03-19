import { cookies } from "next/headers";
import ExpressError from "@/utils/ExpressError.util";
import { SESSION_COOKIE_NAME, getCurrentSessionFromToken } from "@/utils/session.util";

export async function requireApiSession(options = {}) {
  const { adminOnly = false } = options;
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await getCurrentSessionFromToken(token);

  if (!session) {
    throw new ExpressError("Please log in to continue.", 401);
  }

  if (adminOnly && session.user.role !== "admin") {
    throw new ExpressError("You are not allowed to access this resource.", 403);
  }

  return session;
}
