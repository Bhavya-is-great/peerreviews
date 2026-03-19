"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PasswordField from "@/components/ui/PasswordField";
import styles from "@/components/ui/AuthForm.module.css";

export default function ResetPasswordForm({ token = "" }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(form) {
    if (!token) {
      toast.error("This reset link is invalid or missing.");
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, ...form }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message || "Unable to reset password.");
        return;
      }

      toast.success(result.message || "Password reset successfully.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Unable to reset password right now.");
    }
  }

  return (
    <form className={styles.stack} onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        id="reset-password"
        label="New Password"
        autoComplete="new-password"
        inputProps={register("password", { required: "Password is required." })}
        error={errors.password?.message}
      />

      <PasswordField
        id="reset-confirm-password"
        label="Confirm Password"
        autoComplete="new-password"
        inputProps={register("confirmPassword", {
          required: "Please confirm your password.",
          validate: (value) => value === watch("password") || "Passwords do not match.",
        })}
        error={errors.confirmPassword?.message}
      />

      <button className={styles.button} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Set New Password"}
      </button>
    </form>
  );
}
