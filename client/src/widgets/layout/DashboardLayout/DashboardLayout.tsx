"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

import styles from "./DashboardLayout.module.css";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout, accessToken, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken && !isLoading) {
      router.push("/login");
    }
  }, [accessToken, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!accessToken) {
    return <div>Loading...</div>;
  }

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
          <h3>Here you can add your open positions</h3>
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
