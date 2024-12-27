"use client";

import RatesTable from "../RatesTable";
import styles from "./FirstScreen.module.css";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function FirstScreen() {
  const t = useTranslations("Quotes");
  const currentDate = new Date();

  useEffect(() => {
    const fetchMarkets = async () => {
      const response = await fetch("https://garantex.org/api/v2/markets");

      console.log(await response.json());
    };

    fetchMarkets();
  }, []);

  return (
    <section id="rates" className={`${styles.rates}`}>
      <div>
        <div>
          <p className={`${styles.updated}`}>
            {t("updated")}: {currentDate.getDate()}{" "}
            {
              // @ts-expect-error: need a type
              t.raw(`months.${currentDate.getMonth()}`)
            }{" "}
            {currentDate.getFullYear()}.
          </p>
          <p className={`${styles.header}`}>
            {t("currency-rates")}
            <span className="text-primary-red">.</span>
          </p>
        </div>

        <div className={`${styles.tableWrapper}`}>
          <RatesTable />
        </div>
      </div>
    </section>
  );
}
