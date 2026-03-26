"use client";

import { SubmitEventHandler, useState } from "react";
import { JobStatus } from "@/entities/job/types";
import { useCreateJob } from "../../model/useCreateJob";

import styles from "./CreateJobForm.module.css";
import { useTranslation } from "react-i18next";

export const CreateJobForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [status] = useState<JobStatus>("applied");
  const [location, setLocation] = useState("");
  const { t } = useTranslation();

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
        placeholder={t("Profile.jobTitle")}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className={styles.textarea}
        value={description}
        placeholder={t("Profile.description")}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />

      <input
        className={styles.input}
        value={company}
        placeholder={t("Profile.company")}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        className={styles.input}
        value={location}
        placeholder={t("Profile.location")}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button className={styles.button} type="submit">
        {t("Profile.create")}
      </button>
    </form>
  );
};
