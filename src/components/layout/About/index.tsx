"use client";

import Image from "next/image";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={`${styles.about}`}>
      <div className={`${styles.aboutContent}`}>
        <p className={`${styles.aboutTitle}`}>
          Там, где большие финансы встречаются с абсолютной надежностью
          <span className="text-primary-red">.</span>
        </p>

        <div className={`${styles.advantages}`}>
          <p className={`${styles.advantagesText}`}>
            Каждый день мы осуществляем операции в криптовалюте для частных лиц
            и крупных компаний, которые доверяют нам свои финансы
          </p>

          <div>
            <div className={`${styles.advantageItem}`}>
              <div className={`${styles.advantageNumberWrapper}`}>
                <span className={`${styles.advantageNumber}`}>150</span>
                <span className={`${styles.advantagePlus}`}>+</span>
              </div>

              <p className={`${styles.advantageText}`}>млрд. рублей в год</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.clients}`}>
        <div className={`${styles.clientsContent}`}>
          <p className={`${styles.clientsTitle}`}>Нам доверяют лучшие</p>

          <div
            className={`${styles.clientsList}`}
          >
            {Array.from({ length: 4 }).map((_, inx) => (
              <div
                className={`${styles.clientItem} group`}
                key={inx}
              >
                <div className={`${styles.clientImage}`}>
                  <Image src={`/images/uminers.png`} fill alt="client" />
                </div>

                <p className={`${styles.clientDescription} ${styles.clientDescriptionHidden} group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100`}>
                  Поставщик оборудования для майнинга
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
