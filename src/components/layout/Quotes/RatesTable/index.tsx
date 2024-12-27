import Image from "next/image";
import styles from "./RatesTable.module.css";
import { useTranslations } from "next-intl";

export default function RatesTable() {
  const t = useTranslations("Quotes");

  return (
    <div className={`${styles.tableWrapper}`}>
      <div className={`${styles.ratesTable}`}>
        <div className={`${styles.tableHeader}`}>
          <p className={`${styles.colTitle}`}>{t("source")}</p>
          <p className={`${styles.colTitle}`}>{t("currency")}</p>
          <p className={`${styles.colTitle}`}>{t("rates")}</p>
        </div>
        <div className={`${styles.tableBody}`}>
          {Array.from({ length: 5 }).map((_, inx) => (
            <div key={inx} className={`${styles.tableRow}`}>
              <p className={`${styles.source}`}>
                Garantex <span className={`${styles.type}`}>{t("buy")}</span>
              </p>
              <p className={`${styles.currency}`}>USDT / RUB</p>
              <div className={`${styles.price}`}>
                <span>
                  <span>102,55</span>

                  <div className={`${styles.arrowContainer}`}>
                    <Image
                      src="/images/quotes/fall-price.png"
                      fill
                      alt="fall price"
                    />
                  </div>
                </span>

                <span className={`${styles.difference}`}>-0,55 (-0,22%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
