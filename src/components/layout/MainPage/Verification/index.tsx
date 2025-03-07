"use client";

import { useLocale, useTranslations } from "next-intl";

import CustomLink from "@/components/ui/Link";
import { HTMLAttributes } from "react";
import Image from "next/image";
import styles from "./Verification.module.css";
import { useModal } from "@/providers/ModalProvider";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description: string;
  image?: boolean;
  red?: boolean;
  descriptionClassName?: string;
}

export default function Verification() {
  const t = useTranslations("Index.Verification");
  const locale = useLocale();

  return (
    <section id="verification" className={`${styles.verification}`}>
      <div className={`${styles.verificationInner}`}>
        <div className={`${styles.verificationTitleWrapper}`}>
          <h3 className={`${styles.verificationTitle} section-title`}>
            {t("title")}
          </h3>

          <h2
            className={`${styles.verificationDescription} hidden md:block lg:hidden section-subtitle`}
            dangerouslySetInnerHTML={{ __html: t.raw("subtitle") }}
          />
        </div>

        <div className={`${styles.verificationContent}`}>
          <h2
            className={`${
              styles.verificationDescription
            } md:hidden lg:block section-subtitle ${
              locale === "en" ? styles.verificationDescriptionEn : ""
            }`}
            dangerouslySetInnerHTML={{ __html: t.raw("subtitle") }}
          />

          <div className={`${styles.cardsWrapper}`}>
            <div className={`${styles.cardsCol} ${styles.cardsColFirst}`}>
              <Card
                title={t("cards.0.title")}
                description={t.raw("cards.0.description")}
                image
                className="md:h-[210px] lg:h-[258px] xl:h-[258px] 3xl:h-[16.61vw]"
              />
              <Card
                title={t("cards.1.title")}
                description={t.raw("cards.1.description")}
                className="md:h-[210px] lg:h-[258px] xl:h-[258px] 3xl:h-[16.61vw]"
              />
            </div>
            <div className={`${styles.cardsCol} ${styles.cardsColSecond}`}>
              <Card
                title={t("cards.2.title")}
                description={t.raw("cards.2.description")}
                className="flex-1"
              />
              <Card
                description={t.raw("red-card.description")}
                red
                descriptionClassName={styles.redCardDescription}
                className="md:max-h-[156px] lg:max-h-[180px] xl:max-h-[180px] 3xl:max-h-[11.61vw]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Card = ({
  title,
  description,
  className,
  image,
  red,
  descriptionClassName,
  ...props
}: ICardProps) => {
  const { openModal } = useModal();

  const t = useTranslations("Index.Verification.red-card");
  const locale = useLocale();

  return (
    <div
      className={`${styles.card} ${red ? styles.redCard : ""} ${className}`}
      {...props}
    >
      {!red && <div className={`${styles.redDot}`}></div>}

      <div
        className={`${styles.cardContent} ${
          red && styles.redCardContent
        } cardContent`}
      >
        {!red && <h4 className={`${styles.cardTitle}`}>{title}</h4>}

        <p
          className={`${descriptionClassName} cardDescription`}
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {red && (
          <div
            className={`${styles.cardLink} ${
              locale === "en" ? styles.cardLinkEn : ""
            }`}
          >
            <CustomLink
              href=""
              light
              onClick={(evt) => {
                evt.preventDefault();
                openModal();
              }}
            >
              {t("get-consultation")}
            </CustomLink>
          </div>
        )}
      </div>
      {image && (
        <div className={`${styles.cardImageWrapper}`}>
          <div className={`${styles.cardImage}`}>
            <Image
              src={"/images/big-gradient-glass.png"}
              fill
              alt="big-gradient-glass"
            />
          </div>
        </div>
      )}
    </div>
  );
};
