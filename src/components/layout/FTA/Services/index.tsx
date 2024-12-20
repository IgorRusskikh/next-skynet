import styles from "./Service.module.css";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("VED.Services");

  return (
    <section id="services" className={`${styles.services}`}>
      <div className={`${styles.servicesContainer}`}>
        <div className={`${styles.servicesTitleWrapper}`}>
          <h2 className={`${styles.servicesTitle} section-title`}>
            {t("title")}
          </h2>

          <div className={`${styles.servicesContentText}`}>
            <h3
              className={`${styles.servicesContentTitle} section-subtitle`}
              dangerouslySetInnerHTML={{ __html: t.raw("subtitle") }}
            />
            <p
              className={`${styles.servicesContentDescription}`}
              dangerouslySetInnerHTML={{ __html: t.raw("description") }}
            />
          </div>
        </div>

        <div className={`${styles.cards}`}>
          {Array.from({ length: 2 }).map((_, inx) => (
            <ServiceCard
              key={inx}
              forWhom={
                // @ts-expect-error: need a type
                t.raw(`cards.${inx}.for-whom`)
              }
              title={
                // @ts-expect-error: need a type
                t.raw(`cards.${inx}.title`)
              }
              description={
                // @ts-expect-error: need a type
                t.raw(`cards.${inx}.description`)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface IServiceCard {
  forWhom: string;
  title: string;
  description: string;
}

function ServiceCard({ forWhom, title, description }: IServiceCard) {
  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.forWhom}`}>
        <div className={`${styles.dot}`}></div>
        <p dangerouslySetInnerHTML={{ __html: forWhom }} />
      </div>

      <div className={`${styles.cardContent}`}>
        <h4
          className={`${styles.cardTitle}`}
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <p
          className={`${styles.cardDescription}`}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}
