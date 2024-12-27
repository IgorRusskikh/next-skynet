import Image from "next/image";
import styles from "./RatesTable.module.css";

export default function RatesTable() {
  return (
    <div className={`${styles.tableWrapper}`}>
      <div className={`${styles.ratesTable}`}>
        <div className={`${styles.tableHeader}`}>
          <p className={`${styles.colTitle}`}>Источник</p>
          <p className={`${styles.colTitle}`}>Источник</p>
          <p className={`${styles.colTitle}`}>Источник</p>
        </div>
        <div className={`${styles.tableBody}`}>
          <div className={`${styles.tableRow}`}>
            <p className={`${styles.source}`}>
              Garantex <span className={`${styles.type}`}>Покупка</span>
            </p>
            <p className={`${styles.currency}`}>USDT / RUB</p>
            <div className={`${styles.price}`}>
              <span>102,55</span>

              <div className={`${styles.arrowContainer}`}>
                <Image
                  src="/images/quotes/fall-price.png"
                  fill
                  alt="fall price"
                />
              </div>

              <span className={`${styles.difference}`}>-0,55 (-0,22%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
