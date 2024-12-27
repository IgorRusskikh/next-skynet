import RatesTable from "../RatesTable";
import styles from "./FirstScreen.module.css";

export default function FirstScreen() {
  return (
    <section id="rates" className={`${styles.rates}`}>
      <div>
        <div>
          <p className={`${styles.updated}`}>Обновлено 19 декабря 2024г.</p>
          <p className={`${styles.header}`}>
            Котировки валют<span className="text-primary-red">.</span>
          </p>
        </div>

        <div className={`${styles.tableWrapper}`}>
          <RatesTable />
        </div>
      </div>
    </section>
  );
}
