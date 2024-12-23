"use client";

import { useLocale, useTranslations } from "next-intl";

import { DropdownContext } from "@/providers/DropdownProvider";
import Header from "../Header";
import { INNER_SITES } from "@/constants";
import Link from "next/link";
import styles from "./Dropdown.module.css";
import { useContext } from "react";
import { usePathname } from "next/navigation";

export default function Dropdown() {
  const { isOpen } = useContext(DropdownContext);

  const path = usePathname()
  const curPath = path.split('/').slice(2).join('/');

  const t = useTranslations("Index.Header");
  const locale = useLocale();

  return (
    <div
      className={`${styles.dropdown} ${isOpen ? styles.open : styles.close}`}
    >
      <div className={`${styles.dropdownContent}`}>
        <Header />
        <div className={`${styles.dropdownLinksList}`}>
          {Object.values(INNER_SITES).map(({ link }, inx) => (
            <a key={inx} href={`/${locale}/${link}`} className={`${`/${curPath}` === link ? styles.currentPage : ""}`}>
              {
                // @ts-expect-error: need a type
                t(`nav-links.${inx}`)
              }
            </a>
          ))}
        </div>
        <p></p>
      </div>
    </div>
  );
}
