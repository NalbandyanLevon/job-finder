"use client";

import { SubmitEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { login } from "@/services/api/auth";

import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { setAccessToken, setUser } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      const data = await login(email, password);

      if (data.success) {
        setAccessToken(data.accessToken as string);
        setUser(data.user);
        router.push("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome back 👋</h1>
        <p className={styles.subtitle}>Login to your account</p>

        <form className={styles.form} onSubmit={handleLogin}>
          <input
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className={styles.button} type="submit">
            Login
          </button>
        </form>

        <p className={styles.footer}>
          Don’t have an account?{" "}
          <span onClick={() => router.push("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}
