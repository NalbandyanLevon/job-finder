"use client";

import { SubmitEventHandler, useState } from "react";
import { JobStatus } from "@/entities/job/types";
import { useCreateJob } from "../../model/useCreateJob";

import styles from "./CreateJobForm.module.css";

export const CreateJobForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [status] = useState<JobStatus>("applied");
  const [location, setLocation] = useState("");

  const createMutation = useCreateJob();

  const clearFields = () => {
    setTitle("");
    setDescription("");
    setCompany("");
    setLocation("");
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!title || !company) {
      alert("Title and Company are required");
      return;
    }

    createMutation.mutate({
      company,
      status,
      title,
      description,
      location,
    });
    clearFields();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={title}
        placeholder="Job Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className={styles.textarea}
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />

      <input
        className={styles.input}
        value={company}
        placeholder="Company"
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        className={styles.input}
        value={location}
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />

      <button className={styles.button} type="submit">
        Create Job
      </button>
    </form>
  );
};
