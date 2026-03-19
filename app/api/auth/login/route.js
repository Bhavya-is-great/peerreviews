import { loginController } from "@/controllers/auth.controller";
import apiHandler from "@/utils/api.middleware";
import {
  removePendingVerificationCookie,
  setPendingVerificationCookie,
} from "@/utils/pendingVerification.util";
import { removeSessionCookie, setSessionCookie } from "@/utils/session.util";

export const POST = apiHandler(async (request) => {
  try {
    const body = await request.json();
    const result = await loginController(body);

    if (result.session) {
      await setSessionCookie(result.session);
      await removePendingVerificationCookie();
    }

    if (result.pendingVerification) {
      await removeSessionCookie();
      await setPendingVerificationCookie(result.pendingVerification);
    }

    return result;
  } catch (error) {
    if (error?.data?.pendingVerification) {
      await removeSessionCookie();
      await setPendingVerificationCookie(error.data.pendingVerification);
      delete error.data.pendingVerification;
    }

    throw error;
  }
});
