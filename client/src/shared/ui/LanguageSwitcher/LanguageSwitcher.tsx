"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { languages } from "@/shared/model/languages";

import styles from "./LanguageSwitcher.module.css";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  const current =
    languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div className={styles.container}>
      <button className={styles.current} onClick={() => setOpen(!open)}>
        <span className={styles.flag}>{current.flag}</span> {current.label} ▼
      </button>

      {open && (
        <ul className={styles.dropdown}>
          {languages.map((lang) => (
            <li key={lang.code} onClick={() => handleChange(lang.code)}>
              <span className={styles.flag}>{lang.flag}</span> {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
