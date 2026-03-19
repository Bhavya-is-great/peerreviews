import { signupController } from "@/controllers/auth.controller";
import apiHandler from "@/utils/api.middleware";
import { setPendingVerificationCookie } from "@/utils/pendingVerification.util";
import { setSessionCookie } from "@/utils/session.util";

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const result = await signupController(body);

  if (result.session) {
    await setSessionCookie(result.session);
  }

  if (result.pendingVerification) {
    await setPendingVerificationCookie(result.pendingVerification);
  }

  return result;
});
