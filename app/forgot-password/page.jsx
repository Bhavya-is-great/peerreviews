import { redirect } from "next/navigation";
import ForgotPasswordForm from "@/components/login/ForgotPasswordForm";
import AuthShell from "@/components/ui/AuthShell";
import { getCurrentPendingVerification } from "@/utils/pendingVerification.util";
import { getCurrentSession } from "@/utils/session.util";

export const metadata = {
  title: "Forgot Password | Kodex Peer Reviews",
  description: "Request a secure password reset link.",
};

export default async function ForgotPasswordPage() {
  const session = await getCurrentSession();
  const pendingVerification = await getCurrentPendingVerification();

  if (session) {
    redirect("/");
  }

  if (pendingVerification) {
    redirect("/verify-otp");
  }

  return (
    <AuthShell
      badge="Magic Link"
      title="Reset your password by email"
      description="We will send a time-limited reset link to the email attached to your account."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
