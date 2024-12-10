'use client';

import Link from "next/link";
import Header from "../Header";
import styles from "./Dropdown.module.css";
import { INNER_SITES } from "@/constants";
import { useContext } from "react";
import { DropdownContext } from "@/providers/DropdownProvider";

export default function Dropdown() {
  const { isOpen } = useContext(DropdownContext); 

  return (
    <div className={`${styles.dropdown} ${isOpen ? styles.open : styles.close}`}>
      <div className={`${styles.dropdownContent}`}>
        <Header />
        <div className={`${styles.dropdownLinksList}`}>
          {Object.entries(INNER_SITES).map(([key, { link, title }]) => (
            <Link key={key} href={link}>
              {title}
            </Link>
          ))}
        </div>
        <p></p>
      </div>
    </div>
  );
}
