"use client";

import { IJob } from "@/entities/job/types";
import { useGetAllJobs } from "@/features/jobs/model/useAllJobs";
import { useJobsByUser } from "@/features/jobs/model/useJobsByUser";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

import styles from "./JobsPage.module.css";

const JobsPage = () => {
  const { user } = useAuthStore();

  const isAdmin = user?.role === "admin";

  const allJobsQuery = useGetAllJobs({
    enabled: isAdmin,
  });

  const userJobsQuery = useJobsByUser({
    enabled: !isAdmin && !!user?._id,
  });

  const data = isAdmin ? allJobsQuery.data : userJobsQuery.data;
  const isLoading = isAdmin ? allJobsQuery.isLoading : userJobsQuery.isLoading;

  const error = isAdmin ? allJobsQuery.error : userJobsQuery.error;

  if (isLoading) return <div>Loading...</div>;
  if (error || !data?.data) return <div>Error</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5vh" }}>
      <h1>Jobs</h1>
      <div className={styles.container}>
        {data.data.map((job: IJob) => (
          <Link href={`/jobs/${job._id}`} key={job._id}>
            <div
              className={styles.titleHeader}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
              }}
            >
              <h3 className={styles.title}>{job.title}</h3>

              <p className={styles.company}>{job.company}</p>

              <span className={`${styles.status} ${styles[job.status]}`}>
                {job.status.toUpperCase()}
              </span>

              {job.location && (
                <p className={styles.location}>📍 {job.location}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
