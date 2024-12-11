import Image from "next/image";
import styles from "./Verification.module.css";
import { HTMLAttributes } from "react";
import CustomLink from "@/components/ui/Link";
import { useTranslations } from "next-intl";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description: string;
  image?: boolean;
  red?: boolean;
  descriptionClassName?: string;
}

export default function Verification() {
  const t = useTranslations("Index.Verification")

  return (
    <section id="verification" className={`${styles.verification}`}>
      <div className={`${styles.verificationInner}`}>
        <div className={`${styles.verificationTitleWrapper}`}>
          <h2 className={`${styles.verificationTitle}`}>{t("title")}</h2>

          <h3 className={`${styles.verificationDescription} hidden md:block lg:hidden`}>
            {t("subtitle")}
          </h3>
        </div>

        <div className={`${styles.verificationContent}`}>
          <h3 className={`${styles.verificationDescription} md:hidden lg:block`}>
            {t("subtitle")}
          </h3>

          <div className={`${styles.cardsWrapper}`}>
            <div className={`${styles.cardsCol} ${styles.cardsColFirst}`}>
              <Card
                title={t("cards.0.title")}
                description={t("cards.0.description")}
                image
                className="lg:h-[258px] xl:h-[258px] 3xl:h-[16.61vw]"
              />
              <Card
                title={t("cards.1.title")}
                description={t("cards.1.description")}
                className="lg:h-[258px] xl:h-[258px] 3xl:h-[16.61vw]"
              />
            </div>
            <div className={`${styles.cardsCol} ${styles.cardsColSecond}`}>
              <Card
                title={t("cards.2.title")}
                description={t("cards.2.description")}
                className="flex-1"
              />
              <Card
                description={t("red-card.description")}
                red
                descriptionClassName={styles.redCardDescription}
                className="xl:max-h-[223px] 3xl:max-h-[11.61vw]"
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
  const t = useTranslations("Index.Verification.red-card")

  return (
    <div
      className={`${styles.card} ${red ? styles.redCard : ""} ${className}`}
      {...props}
    >
      {!red && <div className={`${styles.redDot}`}></div>}

      <div
        className={`${styles.cardContent} ${red && styles.redCardContent} cardContent`}
      >
        {!red && <h4 className={`${styles.cardTitle}`}>{title}</h4>}

        <p className={`${descriptionClassName} cardDescription`}>
          {description}
        </p>

        {red && (
          <div className={`${styles.cardLink}`}>
            <CustomLink href="" light>
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
