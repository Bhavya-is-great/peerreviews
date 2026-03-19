import { forgotPasswordController } from "@/controllers/auth.controller";
import apiHandler from "@/utils/api.middleware";
import { getSiteBaseUrl } from "@/utils/siteUrl.util";

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  return forgotPasswordController(body, getSiteBaseUrl(request.nextUrl.origin));
});
