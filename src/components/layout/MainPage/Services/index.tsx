"use client";

import Image from "next/image";
import styles from "./Services.module.css";
import { useMemo, useState } from "react";
import CustomLink from "@/components/ui/Link";
import ServicesSlider from "@/components/ServicesSlider";
import { useTranslations } from "next-intl";

export type service = {
  title: string;
  description: string;
  link: string;
};

export default function Services() {
  const [currentService, setCurrentService] = useState(0);

  const t = useTranslations("Index.Services");

  const services = useMemo(
    // @ts-expect-error: need an interface
    () => Object.values(t.raw("services")) as service[],
    []
  );

  const servicesImage = [
    "/images/services/first-service-image-xs.png",
    "/images/services/second-service-image-xs.png",
    "/images/services/third-service-image-xs.png",
  ];

  return (
    <section id="services" className={`${styles.services}`}>
      <div className={`${styles.servicesContainer}`}>
        <div className={`${styles.servicesTitleWrapper}`}>
          <h2 className={`${styles.servicesTitle}`}>{t("title")}</h2>

          <div
            className={`${styles.servicesContentText} hidden md:block lg:hidden`}
          >
            <h3 className={`${styles.servicesContentTitle}`}>
              {t("description")}
            </h3>
            <p className={`${styles.servicesContentDescription}`}>
              {t("subtitle")}
            </p>
          </div>
        </div>

        <div className={`${styles.servicesContent}`}>
          <div className={`${styles.servicesContentText} md:hidden lg:block`}>
            <h3 className={`${styles.servicesContentTitle}`}>
              {t("description")}
            </h3>
            <p className={`${styles.servicesContentDescription}`}>
              {t("subtitle")}
            </p>
          </div>

          <div className={`${styles.servicesList}`}>
            {/* FOR SCREEN >= 1024PX */}
            <>
              <div className={`${styles.servicesListItems} !hidden lg:!block`}>
                <ul>
                  {services.map(({ title }, inx) => (
                    <li
                      key={title}
                      className={`${styles.servicesListItem} ${
                        currentService === inx ? "text-black" : ""
                      } !cursor-pointer`}
                    >
                      <button
                        className=""
                        onClick={() => setCurrentService(inx)}
                      >
                        {title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${styles.servicesCard} !hidden lg:!flex`}>
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
                          currentService === inx
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
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
                          currentService === inx
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}
                      >
                        <span className={``}>{link}</span>
                      </CustomLink>
                    ))}
                  </p>
                </div>
              </div>
            </>

            {/* FOR SCREEN < 1024PX */}
            <div
              className={`${styles.servicesCard} !hidden md:!flex lg:!hidden`}
            >
              <div className={`${styles.servicesCardHeader}`}>
                {services.map(({ title }, inx) => (
                  <button
                    key={inx}
                    onClick={() => setCurrentService(inx)}
                    className={`${styles.servicesCardHeaderButton} ${
                      currentService === inx ? "!text-black" : ""
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>

              <div className={`${styles.servicesCardDescriptionContainer}`}>
                <p className={`${styles.servicesCardCount}`}>
                  01
                  <span className={`${styles.servicesCardCountSeparator}`}>
                    -
                  </span>
                  {`0${services.length}`}
                </p>

                <div className={`${styles.serviceDescription}`}>
                  <p className={`${styles.servicesCardDescription}`}>
                    {services.map(({ description }, inx) => (
                      <span
                        key={inx}
                        className={`${
                          currentService === inx
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
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
                          currentService === inx
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}
                      >
                        <span className={``}>{link}</span>
                      </CustomLink>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`${styles.serviceImage} ${
                currentService === 0
                  ? styles.serviceImageVisible
                  : styles.serviceImageHidden
              }`}
            >
              <div className={`${styles.firstServiceImageInner}`}>
                <Image
                  src={"/images/first-service-image.png"}
                  fill
                  alt=""
                  className="hidden lg:block"
                />
                <Image
                  src={"/images/first-service-image-md.png"}
                  fill
                  alt=""
                  className="block lg:hidden"
                />
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
                <Image
                  src={"/images/second-service-image.png"}
                  fill
                  alt=""
                  className="hidden lg:block"
                />
                <Image
                  src={"/images/second-service-image-md.png"}
                  fill
                  alt=""
                  className="block lg:hidden"
                />
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
                <Image
                  src={"/images/third-service-image.png"}
                  fill
                  alt=""
                  className="hidden lg:block"
                />
                <Image
                  src={"/images/third-service-image-md.png"}
                  fill
                  alt=""
                  className="block lg:hidden"
                />
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

      <ServicesSlider services={services} images={servicesImage} />
    </section>
  );
}
