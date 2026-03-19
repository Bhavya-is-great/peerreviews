import apiHandler from "@/utils/api.middleware";
import { getCurrentPendingVerification } from "@/utils/pendingVerification.util";

export const GET = apiHandler(
  async () => {
  const pendingVerification = await getCurrentPendingVerification();

    return {
      data: pendingVerification
        ? {
            email: pendingVerification.user.email,
          }
        : null,
    };
  },
  { connectDb: false }
);
