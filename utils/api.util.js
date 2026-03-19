import { NextResponse } from "next/server";

export function createSuccessResponse(result = {}) {
  return NextResponse.json(
    {
      success: true,
      message: result.message || "Request completed successfully.",
      data: result.data ?? null,
    },
    { status: Number(result.statusCode || result.status || 200) }
  );
}

export function createErrorResponse(error, fallbackMessage = "Internal Server Error") {
  const statusCode = Number(error?.statusCode || error?.status || 500);

  return NextResponse.json(
    {
      success: false,
      message: error?.message || fallbackMessage,
      data: error?.data ?? null,
    },
    { status: statusCode }
  );
}
