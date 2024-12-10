"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import IconButton from "../ui/buttons/IconButton";
import TelegramIcon from "@/svg/telegram.svg";
import { DropdownContext } from "@/providers/DropdownProvider";
import { useContext } from "react";
import Logo from "@/svg/logo.svg";

export default function Header() {
  const { isOpen, setIsOpen } = useContext(DropdownContext);

  return (
    <div className={`${styles.navbar}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.logo}`}>
          {/* <div className={`${styles.dots}`}>
            <div></div>
            <div className={`${styles.redDot}`}></div>
          </div> */}

          <Logo className={`${styles.logo}`} />
        </div>

        <nav>
          <ul>
            {Array.from({ length: 4 }).map((_, inx) => (
              <li key={inx}>
                <Link href="/">USDT – FIAT</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div
            className={`${styles.burger} xl:!hidden`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`${styles.burgerLine} ${
                isOpen
                  ? "-rotate-45 translate-y-[2.5vw] translate-x-[0.04vw] md:translate-y-[9.5px] md:-translate-x-[1px] lg:translate-y-[12px] lg:-translate-x-[1px]"
                  : "rotate-0"
              }`}
            ></div>
            <div
              className={`${styles.burgerLine} ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`${styles.burgerLine} ${
                isOpen ? "rotate-45" : "rotate-0"
              }`}
            ></div>
          </div>

          <IconButton icon={TelegramIcon} className={`${styles.telegram}`}>
            TG-Бот
          </IconButton>
        </div>
      </div>
    </div>
  );
}
