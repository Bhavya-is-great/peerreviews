import connectDB from "@/utils/db";
import { createErrorResponse, createSuccessResponse } from "@/utils/api.util";

const apiHandler = (handler, options = {}) => {
  const { connectDb = true } = options;

  return async (req, context) => {
    try {
      if (connectDb) {
        await connectDB();
      }

      const result = await handler(req, context);
      return result instanceof Response ? result : createSuccessResponse(result);
    } catch (error) {
      return createErrorResponse(error);
    }
  };
};

export default apiHandler;
