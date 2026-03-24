"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

import styles from "./NavBar.module.css";

export const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className={styles.container}>
      <Link href="/dashboard">Dashboard</Link>

      {user && <Link href="/jobs">Jobs</Link>}

      {user?.role === "admin" && <Link href="/users">Users</Link>}

      <Link href={`/users/${user!._id}`}>Profile</Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
