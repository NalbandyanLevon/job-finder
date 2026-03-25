"use client";

import { SubmitEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/api/auth";

import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const data = await register(email, password);
      if (data.success) {
        alert("Registered successfully 🎉");
        router.push("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create account 🚀</h1>
        <p className={styles.subtitle}>Start tracking your jobs</p>

        <form className={styles.form} onSubmit={handleRegister}>
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
            Register
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account?{" "}
          <span onClick={() => router.push("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}
