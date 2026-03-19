import { resetPasswordController } from "@/controllers/auth.controller";
import apiHandler from "@/utils/api.middleware";
import { removePendingVerificationCookie } from "@/utils/pendingVerification.util";
import { setSessionCookie } from "@/utils/session.util";

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const result = await resetPasswordController(body);

  if (result.session) {
    await setSessionCookie(result.session);
  }

  await removePendingVerificationCookie();
  return result;
});
