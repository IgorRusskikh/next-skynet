"use client";

import Image from "next/image";
import styles from "./Services.module.css";
import { useMemo, useState } from "react";
import CustomLink from "@/components/ui/Link";

export default function Services() {
  const [currentService, setCurrentService] = useState(0);

  const services = useMemo(
    () => [
      {
        title: "Обмен USDT ⇄ FIAT",
        description:
          "Обмениваем криптовалюту на наличные или безналичные средства и наоборот. Обновляем курсы валют и актуальную комиссию в Telegram-боте",
        link: "Подробнее о USDT – FIAT",
      },
      {
        title: "Cash2Cash",
        description:
          "Принимаем USDT/FIAT и выдаём денежные средства по всему миру: в наших офисах и в офисах партнёров  в 30+ странах",
        link: "Подробнее о Cash2Cash",
      },
      {
        title: "Платежи для ВЭД",
        description:
          "Оплачиваем счета зарубежных поставщиков через  сеть юридических лиц в 30+ странах. Документально оформляем все сделки и обходим банковские ограничения",
        link: "Подробнее о Платежи для ВЭД",
      },
    ],
    []
  );

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
                {services.map(({ title }, inx) => (
                  <li
                    key={title}
                    className={`${styles.servicesListItem} ${
                      currentService === inx ? "text-black" : ""
                    } !cursor-pointer`}
                  >
                    <button className="" onClick={() => setCurrentService(inx)}>
                      {title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${styles.servicesCard}`}>
              <div className={`${styles.servicesCardCount}`}>
                <span className="w-[20px]">{`0${currentService + 1}`} </span>
                <span className={`${styles.servicesCardCountSeparator}`}>
                  -
                </span>{" "}
                {`0${services.length}`}
              </div>

              <div className={`${styles.servicesCardContent}`}>
                <p className={`${styles.servicesCardDescription}`}>
                  {services.map(({ description }, inx) => (
                    <span
                      key={inx}
                      className={`${
                        currentService === inx ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {description}
                    </span>
                  ))}
                </p>

                <p className={`${styles.servicesCardLink}`}>
                  {services.map(({ link }, inx) => (
                    <CustomLink
                      key={inx}
                      href=""
                      className={`${
                        currentService === inx ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <span className={``}>{link}</span>
                    </CustomLink>
                  ))}
                </p>
              </div>

              <div
                className={`${styles.serviceImage} ${
                  currentService === 0
                    ? styles.serviceImageVisible
                    : styles.serviceImageHidden
                }`}
              >
                <div className={`${styles.firstServiceImageInner}`}>
                  <Image src={"/images/first-service-image.png"} fill alt="" />
                </div>
              </div>

              <div
                className={`${styles.serviceImage} ${
                  currentService === 1
                    ? styles.serviceImageVisible
                    : styles.serviceImageHidden
                }`}
              >
                <div className={`${styles.secondServiceImageInner}`}>
                  <Image src={"/images/second-service-image.png"} fill alt="" />
                </div>
              </div>

              <div
                className={`${styles.serviceImage} ${
                  currentService === 2
                    ? styles.serviceImageVisible
                    : styles.serviceImageHidden
                }`}
              >
                <div className={`${styles.thirdServiceImageInner}`}>
                  <Image src={"/images/third-service-image.png"} fill alt="" />
                </div>
              </div>

              <div
                className={`${styles.serviceImage} ${
                  currentService === 3
                    ? styles.serviceImageVisible
                    : styles.serviceImageHidden
                }`}
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
