import { verifyOtpController } from "@/controllers/auth.controller";
import apiHandler from "@/utils/api.middleware";
import {
  getCurrentPendingVerification,
  removePendingVerificationCookie,
} from "@/utils/pendingVerification.util";
import { setSessionCookie } from "@/utils/session.util";

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const pendingVerification = await getCurrentPendingVerification();

  const result = await verifyOtpController({
    ...body,
    pendingVerificationToken: pendingVerification?.token,
    pendingVerificationUserId: pendingVerification?.user?.id,
  });

  if (result.session) {
    await setSessionCookie(result.session);
  }

  await removePendingVerificationCookie();

  return result;
});
