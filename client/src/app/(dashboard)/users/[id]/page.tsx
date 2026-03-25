"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useUserById } from "@/features/users/model/useUserById";
import { useParams, useRouter } from "next/navigation";
import { TRole } from "@/entities/user/types";
import { useDelete } from "@/features/users/model/useDelete";
import { updateUser } from "@/features/users/api/users";
import { CreateJobForm } from "@/features/jobs/ui/CreateForm/CreateJobForm";
import { useJobsByUser } from "@/features/jobs/model/useJobsByUser";

import Link from "next/link";

import styles from "./UserPage.module.css";

export default function UserPage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser, setUser } = useAuthStore();

  const id = params?.id as string;
  const { data, isLoading, refetch } = useUserById(id);
  const { data: jobsData } = useJobsByUser();

  const isOwnProfile = currentUser?._id === id;

  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TRole>(currentUser?.role ?? "user");

  const deleteMutation = useDelete();

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (!data) return <div className={styles.notFound}>User not found</div>;

  const userData = data.data;

  const startEdit = () => {
    setEmail(userData.email);
    setRole(userData.role);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updated = await updateUser({
        id: userData._id,
        data: { email, role },
      });
      setIsEditing(false);
      if (isOwnProfile) setUser(updated.data);
      refetch();
    } catch {
      alert("Failed to update user");
    }
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete your account?")) return;
    deleteMutation.mutate(userData._id, {
      onSuccess: () => {
        setUser(null);
        router.push("/login");
      },
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {isOwnProfile ? "My Profile" : "User Profile"}
      </h1>

      <div className={styles.card}>
        <div className={styles.field}>
          <strong>Email:</strong>
          {isEditing ? (
            <input
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <span>{userData.email}</span>
          )}
        </div>

        <div className={styles.field}>
          <strong>Role:</strong>
          {isEditing ? (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as TRole)}
              className={styles.select}
              disabled={role !== "admin"}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          ) : (
            <span>{userData.role}</span>
          )}
        </div>

        {(isOwnProfile || currentUser?.role === "admin") && (
          <div className={styles.buttons}>
            {!isEditing ? (
              <button className={styles.edit} onClick={startEdit}>
                Edit Profile
              </button>
            ) : (
              <button className={styles.save} onClick={handleSave}>
                Save
              </button>
            )}
            <button className={styles.delete} onClick={handleDelete}>
              Delete Account
            </button>
          </div>
        )}
      </div>

      <div>
        <h2>{isOwnProfile ? "My Jobs" : "User Jobs"}</h2>
        <div className={styles.jobsGrid}>
          {jobsData?.data.map((job) => (
            <Link
              href={`/jobs/${job._id}`}
              key={job._id}
              className={styles.jobCard}
            >
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              {job.location && <p>📍 {job.location}</p>}
            </Link>
          ))}
        </div>
      </div>

      {isOwnProfile && (
        <div>
          <h2>Add Job</h2>
          <CreateJobForm />
        </div>
      )}

      <Link href={"/users"} className={styles.link}>
        Back to users
      </Link>
    </div>
  );
}
