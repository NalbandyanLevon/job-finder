"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

import styles from "./DashboardLayout.module.css";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <aside>
        <h2>Job Tracker</h2>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/jobs">Jobs</Link>
        {user?.role === "admin" && <Link href="/users">Users</Link>}
        <Link href={`/users/${user?._id}`}>Profile</Link>
      </aside>

      <div className={styles.header}>
        <header>
          <h3>Job Tracker: Here you can add your open positions</h3>

          <div>
            <span>
              {user?.email} {user?.role === "admin" && "admin"}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
};
