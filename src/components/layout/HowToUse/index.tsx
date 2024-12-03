import styles from "./HowToUse.module.css";

export default function HowToUse() {
  return (
    <section id="how-to-use" className={`${styles.howToUse}`}>
      <div className={`${styles.howToUseInner}`}>
        <div className={`${styles.sectionHeader}`}>
          <h2 className={`${styles.howToUseTitle}`}>Как это работает?</h2>

          <p className={`${styles.howToUseDescription}`}>
            <span className="text-black">
              Управляйте финансовыми операциями в одном Telegram-боте.
            </span>{" "}
            Наш бот — это удобный инструмент для управления финансами, в котором
            можно заказывать обмены криптовалюты, переводы, оплату счета, обмен
            валюты и консультации менеджера
          </p>
        </div>

        <div className={`${styles.howToUseContent}`}>
          <div className={`${styles.banner}`}>
            <p className={`${styles.bannerTitle}`}>Выберите услугу в TG-боте</p>

            <div className={`${styles.bannerStep}`}>
              <p className={`${styles.bannerStepNumber}`}>01</p>

              <p className={`${styles.bannerStepDescription}`}>
                Укажите вашу задачу, нужную сумму и валюту или закажите
                консультацию менеджера
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
