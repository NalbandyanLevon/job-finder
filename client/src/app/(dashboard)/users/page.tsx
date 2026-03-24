"use client";

import { useDelete } from "@/features/users/model/useDelete";
import { useUsers } from "@/features/users/model/useUsers";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

import styles from "./UsersPage.module.css";

export default function UsersPage() {
  const { data, isLoading, refetch } = useUsers();
  const { user: currentUser } = useAuthStore();
  const deleteMutation = useDelete();

  const handleDelete = (id: string, email: string) => {
    if (!confirm(`Are you sure you want to delete ${email} account?`)) return;
    deleteMutation.mutate(id, {
      onSuccess: () => refetch(),
    });
  };

  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Users</h1>
      <div className={styles.grid}>
        {data?.data.map((eachUser) => (
          <div key={eachUser._id} className={styles.card}>
            <div className={styles.info}>
              <Link href={`/users/${eachUser._id}`} className={styles.email}>
                {eachUser.email}
              </Link>
              <span className={styles.role}>{eachUser.role.toUpperCase()}</span>
            </div>
            {currentUser?.role === "admin" && eachUser.role !== "admin" && (
              <div className={styles.adminButtons}>
                <button
                  className={`${styles.button} ${styles.delete}`}
                  onClick={() => handleDelete(eachUser._id, eachUser.email)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
