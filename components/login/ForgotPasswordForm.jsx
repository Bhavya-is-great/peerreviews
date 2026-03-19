"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import styles from "@/components/ui/AuthForm.module.css";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(form) {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message || "Unable to send reset link.");
        return;
      }

      toast.success(result.message || "Reset link sent if the account exists.");
    } catch {
      toast.error("Unable to send reset link right now.");
    }
  }

  return (
    <form className={styles.stack} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="forgot-email">
          Email
        </label>
        <input
          id="forgot-email"
          className={styles.input}
          type="email"
          autoComplete="email"
          {...register("email", { required: "Email is required." })}
        />
        {errors.email ? <p className={styles.fieldError}>{errors.email.message}</p> : null}
      </div>

      <button className={styles.button} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
}
