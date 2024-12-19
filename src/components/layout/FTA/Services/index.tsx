import styles from "./Service.module.css";

export default function Services() {
  return (
    <section id="services" className={`${styles.services}`}>
      <div className={`${styles.servicesContainer}`}>
        <div className={`${styles.servicesTitleWrapper}`}>
          <h2 className={`${styles.servicesTitle} section-title`}>Услуги</h2>

          <div className={`${styles.servicesContentText}`}>
            <h3 className={`${styles.servicesContentTitle} section-subtitle`}>
              Оплатите сумму для оплаты поставщику и комиссию в рублях на счёт
              компании-нерезидента по агентсткому договору
            </h3>
            <p className={`${styles.servicesContentDescription}`}>
              Мы проводим международные финансовые операции, подбирая быстрые и
              надежные маршруты для любых задач вашего бизнеса
            </p>
          </div>
        </div>

        <div className={`${styles.cards}`}>
          {Array.from({ length: 2 }).map((_, inx) => (
            <ServiceCard key={inx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard() {
  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.forWhom}`}>
        <div className={`${styles.dot}`}></div>
        <p> импортёрам</p>
      </div>

      <div className={`${styles.cardContent}`}>
        <h4 className={`${styles.cardTitle}`}>
          Оплата счетов зарубежных поставщиков
        </h4>

        <p className={`${styles.cardDescription}`}>
          Используем надёжные финансовые каналы, чтобы средства доходили до
          получателя быстро и без задержек
        </p>
      </div>
    </div>
  );
}
