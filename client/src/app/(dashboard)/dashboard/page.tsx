"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

import { useTranslation } from "react-i18next";
import "../../../i18n";

import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user } = useAuthStore();
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t("Dashboard.title")}</h1>

      <p className={styles.subtitle}>
        {t("Dashboard.welcome")}, <span>{user?.email}</span>
      </p>

      <div className={styles.grid}>
        <Link href="/jobs" className={styles.card}>
          📄 {t("Dashboard.jobs")}
        </Link>

        <Link href={`/users/${user?._id}`} className={styles.card}>
          👤 {t("Dashboard.profile")}
        </Link>

        {user?.role === "admin" && (
          <Link href="/users" className={styles.card}>
            🛠 {t("Dashboard.users")}
          </Link>
        )}
      </div>
    </div>
  );
}
