"use client";

import { useEffect, useMemo, useRef } from "react";
import styles from "./HowToUse.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function HowToUse() {
  const startAnimRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const titlesRefs = useRef<HTMLSpanElement[]>([]);
  const stepsCountRefs = useRef<HTMLSpanElement[]>([]);
  const stepsDescriptionRefs = useRef<HTMLSpanElement[]>([]);
  const imagesRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    pinBannerAnim();
    showTitlesAnim();
    showStepsCountAnim();
    showStepsDescriptionAnim();
    showAndHideWelcomePhoneAnim();
    showAndHideTopCallImageAnim()

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  const pinBannerAnim = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top-=125",
        end: "bottom bottom",
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });
  };

  const showTitlesAnim = () => {
    titlesRefs.current.forEach((title, inx) => {
      gsap.to(title, getHideAnimOptions(inx));
    });
  };

  const showStepsCountAnim = () => {
    const tl = gsap.timeline();

    stepsCountRefs.current.forEach((step, inx) => {
      tl.to(stepsCountRefs.current[inx], {
        keyframes: [
          { y: 0, duration: 1 },
          { y: -168, duration: 1 },
          { y: -168, duration: 1 },
          {
            y: inx === stepsCountRefs.current.length - 1 ? -168 : 0,
            duration: 1,
          },
        ],
        scrollTrigger: {
          trigger: startAnimRef.current,
          start: `top+=${900 * inx}`,
          end: `top+=${900 * (inx + 0.9)}`,
          scrub: true,
        },
      });
    });
  };

  const showStepsDescriptionAnim = () => {
    const tl = gsap.timeline();

    stepsDescriptionRefs.current.forEach((step, inx) => {
      tl.to(step, getHideAnimOptions(inx));
    });
  };

  const showAndHideWelcomePhoneAnim = () => {
    gsap.to(imagesRefs.current[0], {
      keyframes: [
        { y: 99, duration: 1, scale: 1 },
        { y: 99, duration: 1 },
        { y: 450, duration: 1 },
      ],
      scrollTrigger: {
        trigger: startAnimRef.current,
        start: "top+=50",
        end: "top+=900",
        scrub: true,
      },
    });

    gsap.to(imagesRefs.current[2], {
      keyframes: [
        { y: 99, duration: 1, scale: 1 },
        { y: 99, duration: 1 },
        { y: 450, duration: 1 },
      ],
      scrollTrigger: {
        trigger: startAnimRef.current,
        start: "top+=1900",
        end: "top+=2700",
        scrub: true,
      },
    });

    gsap.to(imagesRefs.current[3], {
      keyframes: [
        { y: 270, duration: 1, scale: 1 },
        { y: 270, duration: 1 },
      ],
      scrollTrigger: {
        trigger: startAnimRef.current,
        start: "top+=2800",
        end: "top+=3500",
        scrub: true,
      },
    });
  };

  const showAndHideTopCallImageAnim = () => {
    gsap.to(imagesRefs.current[1], {
      keyframes: [
        { y: 230, duration: 1 },
        { y: 230, duration: 1, opacity: 0.9 },
        { y: -230, duration: 1, opacity: 0 },
      ],
      scrollTrigger: {
        trigger: startAnimRef.current,
        start: "top+=900",
        end: "top+=1700",
        scrub: true,
      },
    });
  };

  const getHideAnimOptions = (inx: number) => {
    return {
      keyframes: [
        { opacity: 1, duration: 1 },
        { opacity: 1, duration: 1 },
        {
          opacity: inx === stepsDescriptionRefs.current.length - 1 ? 1 : 0,
          duration: 1,
        },
      ],
      scrollTrigger: {
        trigger: startAnimRef.current,
        start: `top+=${900 * inx}`,
        end: `top+=${900 * (inx + 1)}`,
        scrub: true,
      },
    };
  };

  const bannerTitles = useMemo(
    () => [
      "Выберите услугу в TG-боте",
      "Обсудите детали с менеджером",
      "Подтвердите сделку",
      "Получите средства или подтверждение оплаты",
    ],
    []
  );
  const bannerStepDescription = useMemo(
    () => [
      "Укажите вашу задачу, нужную сумму и валюту или закажите консультацию менеджера",
      "Мы свяжемся для уточнения условий операции и сроков",
      "Предоставьте данные и оплатите комиссию для начала операции",
      "В зависимости от выбранной услуги примите наличные или получите документальное подтверждение вашего перевода ",
    ],
    []
  );

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

        <div ref={startAnimRef}>
          <div className={`${styles.howToUseContent}`} ref={parentRef}>
            <div className={`${styles.banner}`}>
              <div
                className={`${styles.topCallImageWrapper}`}
                ref={(node) => {
                  imagesRefs.current[1] = node!;
                }}
              >
                <div className={`${styles.topCallImage}`}>
                  <Image src={"/images/how-to-use/call.png"} fill alt="call" />
                </div>
              </div>

              <p className={`${styles.bannerTitle}`}>
                {bannerTitles.map((title, index) => (
                  <span
                    key={index}
                    ref={(node) => {
                      titlesRefs.current[index] = node!;
                    }}
                  >
                    {title}
                  </span>
                ))}
              </p>

              <div className={`${styles.bannerStep}`}>
                <p className={`${styles.bannerStepNumber}`}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span
                      key={index}
                      ref={(node) => {
                        stepsCountRefs.current[index] = node!;
                      }}
                    >
                      0{index + 1}
                    </span>
                  ))}
                </p>

                <p className={`${styles.bannerStepDescription}`}>
                  <span className="!relative invisible opacity-0">
                    Укажите вашу задачу, нужную сумму и валюту или закажите
                    консультацию менеджера
                  </span>

                  {bannerStepDescription.map((description, index) => (
                    <span
                      key={index}
                      ref={(node) => {
                        stepsDescriptionRefs.current[index] = node!;
                      }}
                    >
                      {description}
                    </span>
                  ))}
                </p>
              </div>

              <div
                className={`${styles.bottomPhoneImageWrapper}`}
                ref={(node) => {
                  imagesRefs.current[0] = node!;
                }}
              >
                <div className={`${styles.bottomPhoneImage}`}>
                  <Image
                    src={"/images/how-to-use/phone.png"}
                    fill
                    alt="phone"
                  />
                </div>
              </div>

              <div
                className={`${styles.bottomPhoneImageWrapper}`}
                ref={(node) => {
                  imagesRefs.current[2] = node!;
                }}
              >
                <div className={`${styles.bottomPhoneImage}`}>
                  <Image
                    src={"/images/how-to-use/phone-success.png"}
                    fill
                    alt="phone"
                  />
                </div>
              </div>

              <div
                className={`${styles.bottomTransactionImageWrapper}`}
                ref={(node) => {
                  imagesRefs.current[3] = node!;
                }}
              >
                <div className={`${styles.bottomTransactionImage}`}>
                  <Image
                    src={"/images/how-to-use/transaction-success.png"}
                    fill
                    alt="transaction"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
