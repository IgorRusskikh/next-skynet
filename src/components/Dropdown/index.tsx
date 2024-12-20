"use client";

import { DropdownContext } from "@/providers/DropdownProvider";
import Header from "../Header";
import { INNER_SITES } from "@/constants";
import Link from "next/link";
import styles from "./Dropdown.module.css";
import { useContext } from "react";
import { useTranslations } from "next-intl";

export default function Dropdown() {
  const { isOpen } = useContext(DropdownContext);

  const t = useTranslations("Index.Header");

  return (
    <div
      className={`${styles.dropdown} ${isOpen ? styles.open : styles.close}`}
    >
      <div className={`${styles.dropdownContent}`}>
        <Header />
        <div className={`${styles.dropdownLinksList}`}>
          {Object.values(INNER_SITES).map(({ link }, inx) => (
            <Link key={inx} href={link}>
              {
                // @ts-expect-error: need a type
                t(`nav-links.${inx}`)
              }
            </Link>
          ))}
        </div>
        <p></p>
      </div>
    </div>
  );
}
