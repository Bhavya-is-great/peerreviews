"use client";

import { Toaster } from "sonner";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: "#141414",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#fff7f2",
        },
      }}
    />
  );
}
