"use client";

import Image from "next/image";
import styles from "./Services.module.css";
import TopArrow from "@/svg/right-top-arrow.svg";
import { useState } from "react";
import CustomLink from "@/components/ui/Link";

export default function Services() {
  const [currentService, setCurrentService] = useState(0);

  return (
    <section id="services" className={`${styles.services}`}>
      <div className={`${styles.servicesContainer}`}>
        <h2 className={`${styles.servicesTitle}`}>Услуги</h2>

        <div className={`${styles.servicesContent}`}>
          <div className={`${styles.servicesContentText}`}>
            <h3 className={`${styles.servicesContentTitle}`}>
              Обменивайте криптовалюту, оплачивайте счета и получайте наличные
              по всему миру с помощью Skynet
            </h3>
            <p className={`${styles.servicesContentDescription}`}>
              Мы создаем удобные маршруты для перевода крупных сумм, обмена
              криптовалюты на наличные и расчетов с зарубежными поставщиками
            </p>
          </div>

          <div className={`${styles.servicesList}`}>
            <div className={`${styles.servicesListItems}`}>
              <ul>
                {Array.from({ length: 4 }).map((_, inx) => (
                  <li key={inx} className={`${styles.servicesListItem}`}>
                    <button onClick={() => setCurrentService(inx)}>
                      Cash2Cash
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${styles.servicesCard}`}>
              <p className={`${styles.servicesCardCount}`}>
                {`0${currentService + 1}`}{" "}
                <span className={`${styles.servicesCardCountSeparator}`}>
                  -
                </span>{" "}
                04
              </p>

              <div className={`${styles.servicesCardContent}`}>
                <p className={`${styles.servicesCardDescription}`}>
                  Мы создаем удобные маршруты для перевода крупных сумм, обмена
                  криптовалюты на наличные и расчетов с зарубежными поставщиками
                </p>

                <CustomLink href="">Подробнее о USDT – FIAT</CustomLink>
              </div>

              <div
                className={`${styles.serviceImage} ${currentService === 0 ? styles.serviceImageVisible : styles.serviceImageHidden}`}
              >
                <div className={`${styles.firstServiceImageInner}`}>
                  <Image src={"/images/first-service-image.png"} fill alt="" />
                </div>
              </div>

              <div
                className={`${styles.serviceImage} ${currentService === 1 ? styles.serviceImageVisible : styles.serviceImageHidden}`}
              >
                <div className={`${styles.secondServiceImageInner}`}>
                  <Image src={"/images/second-service-image.png"} fill alt="" />
                </div>
              </div>

              <div
                className={`${styles.serviceImage} ${currentService === 2 ? styles.serviceImageVisible : styles.serviceImageHidden}`}
              >
                <div className={`${styles.thirdServiceImageInner}`}>
                  <Image src={"/images/third-service-image.png"} fill alt="" />
                </div>
              </div>

              <div
                className={`${styles.serviceImage} ${currentService === 3 ? styles.serviceImageVisible : styles.serviceImageHidden}`}
              >
                <div className={`${styles.fourthServiceImageInner}`}>
                  <Image src={"/images/fourth-service-image.png"} fill alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
