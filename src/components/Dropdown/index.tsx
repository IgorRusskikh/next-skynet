"use client";

import { useLocale, useTranslations } from "next-intl";

import { DropdownContext } from "@/providers/DropdownProvider";
import Header from "../Header";
import { INNER_SITES } from "@/constants";
import IconButton from "../ui/buttons/IconButton";
import LocaleSwitcher from "../LocaleSwitcher";
import TelegramIcon from "@/svg/telegram.svg";
import styles from "./Dropdown.module.css";
import { useContext } from "react";
import { useModal } from "@/providers/ModalProvider";
import { usePathname } from "next/navigation";

export default function Dropdown() {
  const { isOpen, setIsOpen } = useContext(DropdownContext);

  const path = usePathname();
  const curPath = path.split("/").slice(2).join("/");

  const { openModal } = useModal();

  const t = useTranslations("Index.Header");
  const locale = useLocale();

  return (
    <div
      className={`${styles.dropdown} ${isOpen ? styles.open : styles.close}`}
    >
      <div className={`${styles.dropdownContent}`}>
        <Header />
        <div
          className={`${styles.dropdownContent} !justify-center gap-[8.89vw] md:gap-0 md:!justify-between md:mt-[20%] lg:mt-[15%]`}
        >
          <div className={`${styles.dropdownLinksList}`}>
            {Object.values(INNER_SITES).map(({ link }, inx) => (
              <a
                key={inx}
                href={`/${locale}/${link}`}
                className={`${
                  `/${curPath}` === link ? styles.currentPage : ""
                }`}
              >
                {
                  // @ts-expect-error: need a type
                  t(`nav-links.${inx}`)
                }
              </a>
            ))}
          </div>

          <LocaleSwitcher />
        </div>

        <IconButton
          icon={TelegramIcon}
          className={`${styles.telegram} md:hidden`}
          onClick={() => {
            openModal();
            setIsOpen(false);
          }}
        >
          {t("actions.tg-bot")}
        </IconButton>
      </div>
    </div>
  );
}
