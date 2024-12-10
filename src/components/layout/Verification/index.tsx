import Image from "next/image";
import styles from "./Verification.module.css";
import { HTMLAttributes } from "react";
import CustomLink from "@/components/ui/Link";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description: string;
  image?: boolean;
  red?: boolean;
  descriptionClassName?: string;
}

export default function Verification() {
  return (
    <section id="verification" className={`${styles.verification}`}>
      <div className={`${styles.verificationInner}`}>
        <div className={`${styles.verificationTitleWrapper}`}>
          <h2 className={`${styles.verificationTitle}`}>Верификация</h2>

          <h3 className={`${styles.verificationDescription} hidden md:block lg:hidden`}>
            Управление финансами ещё удобнее с премиум-опциями
            для верифицированных клиентов
          </h3>
        </div>

        <div className={`${styles.verificationContent}`}>
          <h3 className={`${styles.verificationDescription} md:hidden lg:block`}>
            Управление финансами ещё удобнее с премиум-опциями
            для верифицированных клиентов
          </h3>

          <div className={`${styles.cardsWrapper}`}>
            <div className={`${styles.cardsCol} ${styles.cardsColFirst}`}>
              <Card
                title="Доставка курьером"
                description="Доставка средств в удобное место по всему миру"
                image
                className="lg:h-[258px] xl:h-[258px] 3xl:h-[16.61vw]"
              />
              <Card
                title="Персональный менеджер"
                description="Индивидуальное сопровождение от эксперта по криптовалюте и международным переводам"
                className="lg:h-[258px] xl:h-[258px] 3xl:h-[16.61vw]"
              />
            </div>
            <div className={`${styles.cardsCol} ${styles.cardsColSecond}`}>
              <Card
                title="Фиксированный курс"
                description="Закрепляем курс валюты на время от заявки до сделки, чтобы защитить ваши средства от колебаний рынка"
                className="flex-1"
              />
              <Card
                description="Обсудите условия верификации с менеджером, чтобы получить доступ к премиальным функциям"
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
              Выбрать время консультации
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
