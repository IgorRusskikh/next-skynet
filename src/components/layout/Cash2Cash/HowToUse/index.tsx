"use client";

import { RefObject, useEffect, useMemo, useRef } from "react";

import { BREAKPOINTS } from "@/constants";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "./HowToUse.module.css";

export default function HowToUse() {
  const startAnimationRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);
  const titleRefs = useRef<HTMLSpanElement[]>([]);
  const descriptionRefs = useRef<HTMLSpanElement[]>([]);
  // PHONES REFS
  const leftPhoneRef = useRef<HTMLDivElement>(null);
  const rightPhoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pinAnim();

    fadeAnim(counterRefs);
    fadeAnim(titleRefs);
    fadeAnim(descriptionRefs);

    movePhonesAnim();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const pinAnim = () => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isVerticalTablet: `(min-width: ${BREAKPOINTS.verticalTablet}px) and (max-width: ${
          BREAKPOINTS.tablet - 1
        }px)`,
        isTablet: `(min-width: ${BREAKPOINTS.tablet}px)`,
      },
      (context) => {
        const { isTablet, isVerticalTablet } = context.conditions as any;
        
        console.log(isTablet);

        gsap.to(startAnimationRef.current, {
          scrollTrigger: {
            trigger: parentRef.current,
            start: `top ${isTablet ? "top" : "+=174px"}`,
            end: "bottom bottom",
            pin: true,
            scrub: true,
            pinSpacing: false,
          },
        });
      }
    );
  };

  const movePhonesAnim = () => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isVerticalTablet: `(min-width: ${BREAKPOINTS.verticalTablet}px) and (max-width: ${
          BREAKPOINTS.tablet - 1
        }px)`,
        isTablet: `(min-width: ${BREAKPOINTS.tablet - 1}px) and (max-width: ${
          BREAKPOINTS.laptop - 1
        }px)`,
        isLaptop: `(min-width: ${BREAKPOINTS.laptop}px)`,
      },
      (context) => {
        const { isLaptop, isTablet } = context.conditions as any;

        gsap.to(leftPhoneRef.current, {
          y: isLaptop ? -300 : isTablet ? -140 : -300,
          scrollTrigger: {
            trigger: startAnimationRef.current,
            start: `top ${isTablet ? "top" : "+=174px"}`,
            end: `bottom+=${isTablet ? 70 : 100}%`,
            scrub: true,
          },
        });

        gsap.to(rightPhoneRef.current, {
          y: isLaptop ? 300 : isTablet ? 190 : 320,
          scrollTrigger: {
            trigger: startAnimationRef.current,
            start: `top ${isTablet ? "top" : "+=174px"}`,
            end: `bottom+=${isTablet ? 70 : 100}%`,
            scrub: true,
          },
        });
      }
    );
  };

  const fadeAnim = (refsList: RefObject<HTMLElement[]>) => {
    const tl = gsap.timeline();

    if (refsList.current && refsList.current.length !== 0) {
      refsList.current.forEach((ref, inx) => {
        const startPercent = (inx * 70) / 4 - 10;
        const endPercent = ((inx + 1) * 70) / 4 + 5;

        tl.to(ref, {
          keyframes: [
            { opacity: inx === 0 ? 1 : 0 },
            { opacity: 1 },
            { opacity: inx === 3 ? 1 : 0 },
          ],
          scrollTrigger: {
            trigger: startAnimationRef.current,
            start: `top+=${startPercent}%`,
            end: `top+=${endPercent}%`,
            scrub: true,
          },
        });
      });
    }
  };

  const stepsTitles = useMemo(
    () => [
      "Укажите детали перестановки в TG-боте",
      "Обсудите детали с менеджером",
      "Оплатите любым удобным способом",
      "Получите средства в выбранной локации",
    ],
    []
  );

  const stepsDescriptions = useMemo(
    () => [
      "Выберите валюту отправки и получения и локации, в которых удобно отдать и получить средства",
      "Мы свяжемся для уточнения условий операции и сроков",
      "Выберите подходящий способ и оплатите комиссию и необходимую сумму перестановки",
      "Заберите деньги в нашем офисе или офисе партнёров или примите курьера",
    ],
    []
  );

  return (
    <section id="how-to-use" className={`${styles.howToUse}`}>
      <div className={styles.howToUseContainer}>
        <div className={styles.howToUseTitleWrapper}>
          <h2 className={`section-title`}>как это работает</h2>

          <div className={styles.howToUseContentText}>
            <h3 className={`${styles.howToUseContentTitle} section-subtitle`}>
              Воспользуйтесь Telegram-ботом для перестановки средств за 4
              простых шага
            </h3>
          </div>
        </div>

        <div ref={startAnimationRef}>
          <div ref={parentRef} className={`${styles.contentWrapper}`}>
            <div className={styles.howToUseContent}>
              <div className={`${styles.infoContainer}`}>
                <div className={`${styles.stepNumber}`}>
                  <div className={`${styles.stepNumberWrapper}`}>
                    <p className={`${styles.numberMask}`}>04</p>

                    {Array.from({ length: 4 }).map((_, inx) => (
                      <span
                        key={inx}
                        ref={(node) => {
                          if (node) {
                            counterRefs.current.push(node);
                          }
                        }}
                        className={`${styles.stepCount}`}
                      >
                        0{inx + 1}
                      </span>
                    ))}
                  </div>
                  <span className={`${styles.servicesCardCountSeparator}`}>
                    -
                  </span>
                  04
                </div>

                <div className={`${styles.descriptionContainer}`}>
                  <p className={`${styles.stepTitlCntainer}`}>
                    <span className="!opacity-0">
                      Укажите детали перестановки в TG-боте
                    </span>

                    {stepsTitles.map((title, inx) => (
                      <span
                        key={inx}
                        ref={(node) => {
                          if (node) {
                            titleRefs.current.push(node);
                          }
                        }}
                        className={`${styles.stepTitle} ${
                          inx === 0 ? "" : "opacity-0"
                        }`}
                      >
                        {title}
                      </span>
                    ))}
                  </p>

                  <p className={`${styles.stepDescriptionContainer}`}>
                    <span className="!opacity-0">{stepsDescriptions[0]}</span>

                    {stepsDescriptions.map((desc, inx) => (
                      <span
                        key={inx}
                        ref={(node) => {
                          if (node) {
                            descriptionRefs.current.push(node);
                          }
                        }}
                        className={`${styles.stepDescriptionText} ${
                          inx === 0 ? "" : "opacity-0"
                        }`}
                      >
                        {desc}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className={`${styles.phonesContainerWrapper}`}>
                <div className={`${styles.phonesContainer}`}>
                  {/* LEFT IPHONE */}
                  <div
                    ref={leftPhoneRef}
                    className={`${styles.leftIphoneWrapper}`}
                  >
                    <div className={`${styles.leftIphone}`}>
                      <Image
                        src="/images/cash-to-cash/left-phone.png"
                        fill
                        alt="left-phone"
                      />
                    </div>
                  </div>

                  {/* RIGHT IPHONE */}
                  <div
                    ref={rightPhoneRef}
                    className={`${styles.rightIphoneWrapper}`}
                  >
                    <div className={`${styles.rightIphone}`}>
                      <Image
                        src="/images/cash-to-cash/right-phone.png"
                        fill
                        alt="right-phone"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.hidingBlocks}`}>
                <div className={`${styles.hidingBlocksWrapper}`}>
                  <div className={`${styles.bigCircle}`}></div>
                  <div className={`${styles.smallCircle}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
