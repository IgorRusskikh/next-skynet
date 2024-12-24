import Arrow from "@/svg/dropdown.svg";
import { LOCALES } from "@/constants";
import styles from "./LocaleSwitcher.module.css";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function LocaleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  const curLocale = useLocale();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      tabIndex={0}
      className={`${styles.switcherContainer}`}
      onBlur={() => setIsOpen(false)}
    >
      <p
        className={`${styles.currentLocale}`}
        onClick={toggleDropdown}
        role="button"
      >
        {curLocale} <Arrow className={`${styles.arrow} ${isOpen ? "rotate-180" : ""}`} />
      </p>

      <div className={`${styles.localesWrapper} ${isOpen ? styles.open : styles.close}`}>
          <div className={`${styles.localesContainer}`}>
            {LOCALES.map((locale) => (
              <a
                key={locale}
                href={`/${locale}`}
                className={`${styles.localeItem} ${locale === curLocale ? styles.activeLocale : ""}`}
                role="button"
              >
                {locale}
              </a>
            ))}
          </div>
        </div>
    </div>
  );
}
