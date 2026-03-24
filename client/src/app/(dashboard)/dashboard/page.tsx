"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Dashboard</h1>

      <p className={styles.subtitle}>
        Welcome, <span>{user?.email}</span>
      </p>

      <div className={styles.grid}>
        <Link href="/jobs" className={styles.card}>
          📄 Jobs
        </Link>

        <Link href={`/users/${user?._id}`} className={styles.card}>
          👤 My Profile
        </Link>

        {user?.role === "admin" && (
          <Link href="/users" className={styles.card}>
            🛠 Manage Users
          </Link>
        )}
      </div>
    </div>
  );
}
