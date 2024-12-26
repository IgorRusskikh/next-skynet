"use client";

import { useContext, useEffect, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";

import { DropdownContext } from "@/providers/DropdownProvider";
import { INNER_SITES } from "@/constants";
import IconButton from "../ui/buttons/IconButton";
import LocaleSwitcher from "../LocaleSwitcher";
import Logo from "@/svg/logo.svg";
import TelegramIcon from "@/svg/telegram.svg";
import styles from "./Header.module.css";
import { useModal } from "@/providers/ModalProvider";
import useNearTop from "@/hooks/useNearTop";
import { usePathname } from "next/navigation";

interface Props {
  fixed?: boolean;
}

export default function Header({ fixed }: Props) {
  const { isOpen, setIsOpen } = useContext(DropdownContext);

  const isNearTop = useNearTop(5);

  const path = usePathname();
  const curPath = path.split("/").slice(2).join("/");

  const { openModal } = useModal();

  const t = useTranslations("Index.Header");
  const locale = useLocale();

  const navLinks = useMemo(() => {
    // @ts-expect-error: needs interface
    return Object.values(t.raw("nav-links")) as string[];
  }, []);

  return (
    <div
      className={`${styles.navbar} ${fixed ? styles.fixed : ""} ${
        isNearTop && fixed ? "!top-[-20vh]" : "!top-0"
      }`}
    >
      <div className={`${styles.container}`}>
        <a href={`/${locale}`} className={`${styles.logo}`}>
          {/* <div className={`${styles.dots}`}>
            <div></div>
            <div className={`${styles.redDot}`}></div>
          </div> */}

          <Logo className={`${styles.logo}`} />
        </a>

        <div className={`${styles.headerContent}`}>
          <nav>
            <ul>
              {navLinks.map(
                (link, inx) =>
                  inx !== 0 && (
                    <li key={inx}>
                      <a
                        href={`/${locale}/${
                          Object.values(INNER_SITES)[inx].link
                        }`}
                        className={`${
                          curPath ===
                          Object.values(INNER_SITES)
                            [inx].link.split("/")
                            .slice(1)
                            .join("/")
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        {link}
                      </a>
                    </li>
                  )
              )}
            </ul>
          </nav>

          <div className={styles.actions}>
            {!fixed && <LocaleSwitcher className="hidden xl:block" />}

            <div
              className={`${styles.burger} xl:!hidden ${
                isOpen ? "translate-y-[-0.8vw] md:translate-y-0" : ""
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div
                className={`${styles.burgerLine} ${
                  isOpen
                    ? "-rotate-45 translate-y-[2.7vw] translate-x-[-0.1vw] md:translate-y-[9.5px] md:-translate-x-[1px] lg:translate-y-[12px] lg:-translate-x-[1px]"
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

            <IconButton
              icon={TelegramIcon}
              className={`${styles.telegram}`}
              onClick={openModal}
            >
              {t("actions.tg-bot")}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
