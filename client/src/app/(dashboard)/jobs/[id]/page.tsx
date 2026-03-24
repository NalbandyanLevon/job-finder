"use client";

import { useGetOneJob } from "@/features/jobs/model/useOneJob";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useParams } from "next/navigation";

import styles from "./JobPage.module.css";
import { useState } from "react";
import { EditJob } from "@/features/jobs/ui/EditJob/EditJob";

const JobPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOneJob(id!.toString());
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <div>Loading...</div>;

  const job = data?.data;

  const isMyOwnJob = data?.data?.user === user?._id;
  if (!job) return <div>Job not found</div>;
  console.log(isEditing)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>{job.title}</h1>
          <h3>{job.company}</h3>
        </div>
        <Link href={"/jobs"} className={styles.link}>
          Back to jobs page
        </Link>
      </div>

      <span className={`${styles.status} ${styles[job.status]}`}>
        {job.status.toUpperCase()}
      </span>

      <div className={styles.location}>
        {job.location && (
          <p>
            📍 <strong>Location:</strong> {job.location}
          </p>
        )}
      </div>

      {job.description && (
        <div className={styles.description}>
          <h3>Description</h3>
          <p>{job.description}</p>
        </div>
      )}

      {isMyOwnJob && (
        <>
          {isEditing && <EditJob {...job} />}
          <div className={styles.adminButtons}>
            <button
              className={`${styles.button} ${styles.edit}`}
              onClick={() => setIsEditing((prev) => !prev)}
              disabled={isEditing}
            >
              Edit
            </button>
            <button
              className={`${styles.button} ${styles.delete}`}
              disabled={isEditing}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default JobPage;
