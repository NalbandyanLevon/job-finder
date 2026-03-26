"use client";

import { IJob } from "@/entities/job/types";
import { FC, SubmitEventHandler, useState } from "react";
import { useUpdateJob } from "../../model/useUpdateJob";

import styles from "./EditJob.module.css";
import { useTranslation } from "react-i18next";

interface IProps extends IJob {
  onClose: () => void;
}

export const EditJob: FC<IProps> = ({
  title,
  _id,
  company,
  description,
  location,
  onClose,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newCompany, setNewCompany] = useState(company);
  const [newLocation, setNewLocation] = useState(location);

  const { t } = useTranslation();
  const mutation = useUpdateJob();

  const handleUpdate: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutation.mutate({
      id: _id,
      data: {
        title: newTitle,
        description: newDescription,
        company: newCompany,
        location: newLocation,
      },
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <form className={styles.modal} onSubmit={handleUpdate}>
      <input
        className={styles.input}
        value={newTitle}
        placeholder={t("Profile.jobTitle")}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <textarea
        className={styles.textarea}
        value={description}
        placeholder={t("Profile.description")}
        onChange={(e) => setNewDescription(e.target.value)}
        rows={4}
      />
      <input
        className={styles.input}
        value={newCompany}
        placeholder={t("Profile.company")}
        onChange={(e) => setNewCompany(e.target.value)}
      />
      <input
        className={styles.input}
        value={newLocation}
        placeholder={t("Profile.location")}
        onChange={(e) => setNewLocation(e.target.value)}
      />

      <div className={styles.buttonRow}>
        <button
          className={styles.cancelButton}
          onClick={handleCancel}
          type="button"
        >
          {t("Profile.cancel")}
        </button>
        <button className={styles.saveButton} type="submit">
          {t("Profile.save")}
        </button>
      </div>
    </form>
  );
};
