"use client";

import { IJob } from "@/entities/job/types";
import { FC, useState } from "react";
import styles from "./EditJob.module.css";
import { useUpdateJob } from "../../model/useUpdateJob";

export const EditJob: FC<IJob> = ({ title, _id, company, description, location }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newCompany, setNewCompany] = useState(company);
  const [newLocation, setNewLocation] = useState(location);

  const mutation = useUpdateJob();

  const handleUpdate = () => {
    mutation.mutate({
      id: _id,
      data: {
        title: newTitle,
        description: newDescription,
        company: newCompany,
        location: newLocation,
      },
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <input
        className={styles.input}
        value={newTitle}
        placeholder="Job Title"
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        className={styles.input}
        value={newDescription}
        placeholder="Description"
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <input
        className={styles.input}
        value={newCompany}
        placeholder="Company"
        onChange={(e) => setNewCompany(e.target.value)}
      />
      <input
        className={styles.input}
        value={newLocation}
        placeholder="Location"
        onChange={(e) => setNewLocation(e.target.value)}
      />

      <div className={styles.buttonRow}>
        <button className={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button className={styles.saveButton} onClick={handleUpdate}>
          Save
        </button>
      </div>
    </div>
  );
};