"use client";

import { useLocale, useTranslations } from "next-intl";

import Button from "@/components/ui/buttons/Button";
import FooterLogo from "@/svg/footer-logo.svg";
import { INNER_SITES } from "@/constants";
import Image from "next/image";
import styles from "./Footer.module.css";
import { useMemo } from "react";
import { useModal } from "@/providers/ModalProvider";

interface Props {
  page: string;
}

export default function Footer({ page }: Props) {
  const t = useTranslations("Footer");
  const locale = useLocale();

  const { openModal } = useModal();

  const navLinks = useMemo(
    () =>
      // @ts-expect-error: need an interface
      Object.values(t.raw("links.nav.links-list")).map((name, inx) => ({
        title: name,
        link: Object.values(INNER_SITES)[inx].link,
      })),
    []
  );

  return (
    <footer className={`${styles.footer}`}>
      <div className={`${styles.footerContent}`}>
        <div className={`${styles.footerTop}`}>
          <div className={`${styles.footerMascotWrapper}`}>
            <div className={`${styles.footerMascot} hidden md:block`}>
              <Image src="/images/mascot-footer.png" fill alt="mascot" />
            </div>
          </div>

          <div className={`${styles.footerLinks}`}>
            <div className={`${styles.goToTelegram}`}>
              <p
                dangerouslySetInnerHTML={{
                  // @ts-expect-error: need a type
                  __html: t.raw(`tg-block.titles.${page}`),
                }}
              />

              <Button theme="red" onClick={openModal}>
                {t("tg-block.go-to-tg")}
              </Button>
            </div>

            <div className="flex md:block mt-[12.22vw] md:mt-0">
              <div className={`${styles.footerLinksGrid}`}>
                <div
                  className={`${styles.footerLinksNav} ${styles.footerLinksGridItem}`}
                >
                  <h5>{t("links.nav.title")}</h5>

                  <div className={`${styles.footerLinksList}`}>
                    <ul>
                      {navLinks.map(({ title, link }) => (
                        <li key={title as string}>
                          <a href={`/${locale}/${link}`}>{title as string}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className={`${styles.footerContacts} ${styles.footerLinksGridItem}`}
                >
                  <h5>{t("links.contacts.title")}</h5>

                  <div className={`${styles.footerContactsList}`}>
                    {contacts.map(({ name, link }) => (
                      <a key={name} href={link}>
                        {name}
                      </a>
                    ))}
                  </div>
                </div>

                <div
                  className={`${styles.footerSubscribe} ${styles.footerLinksGridItem} lg:min-w-[293px] xl:min-w-0`}
                >
                  <h5>{t("links.subscribe.title")}</h5>

                  <div>
                    <Button>{t("links.subscribe.subscribe-button")}</Button>
                  </div>
                </div>
              </div>

              <div className={`${styles.footerMascotWrapper}`}>
                <div className={`${styles.footerMascot} md:hidden`}>
                  <Image src="/images/mascot-footer.png" fill alt="mascot" />
                </div>
              </div>
            </div>

            <div
              className={`${styles.footerSubscribe} ${styles.footerLinksGridItem} ${styles.footerSubscribeMobile}`}
            >
              <h5 className="border-none">{t("links.subscribe.title")}</h5>

              <div>
                <Button>{t("links.subscribe.subscribe-button")}</Button>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.footerBottom}`}>
          <div>
            <FooterLogo className={`${styles.footerBottomLogo}`} />
          </div>

          <div className={`${styles.bottomLinks}`}>
            <div className={`${styles.bottomLinksItem}`}>
              <a href="/privacy-policy" target="_blank">
                {t("policy")}
              </a>

              <p>
                © {new Date().getFullYear()} {t("rights")}
              </p>
            </div>

            <a href="https://futuremarkt.com/ru" target="_blank">
              {t("development")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const contacts = [
  // {
  //   name: "@TG Bot",
  //   link: "@TG Bot",
  // },
  {
    name: "+0 000 000 00 00",
    link: "",
  },
  {
    name: "support@skynetgroup.ru",
    link: "mailto:support@skynetgroup.ru",
  },
];
