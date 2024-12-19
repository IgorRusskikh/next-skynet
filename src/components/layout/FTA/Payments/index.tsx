"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Agreement from "@/svg/agreement.svg";
import { BREAKPOINTS } from "@/constants";
import CNY from "@/svg/cny.svg";
import EUR from "@/svg/euro.svg";
import Ruble from "@/svg/ruble.svg";
import USD from "@/svg/usd.svg";
import gsap from "gsap";
import styles from "./Payments.module.css";

export default function Payments() {
  const [currentStep, setCurrentStep] = useState(0);

  const stepsRefs = useRef<HTMLDivElement[]>([]);
  const descriptionRefs = useRef<HTMLDivElement[]>([]);
  const rubleRef = useRef<SVGElement>(null);
  const coinsRefs = useRef<SVGElement[]>([]);

  useEffect(() => {
    const progressTl = gsap.timeline();

    stepsRefs.current.forEach((ref) => {
      gsap.killTweensOf(ref);
    });

    stepsRefs.current.forEach((ref) => {
      gsap.set(ref, {
        width: "0%",
        opacity: 1,
      });
    });

    if (currentStep === 0) {
      firstStepAnim(progressTl);
      moveRuble();
    } else {
      secondStepAnim(progressTl);
      moveCoins();
    }

    return () => {
      progressTl.kill();
    };
  }, [currentStep]);

  const firstStepAnim = (tl: ReturnType<typeof gsap.timeline>) => {
    tl.to(stepsRefs.current[0], {
      width: "100%",
      duration: 12,
      onComplete: () => {
        setCurrentStep(1);
      },
    })
      .to(stepsRefs.current[0], {
        opacity: 0,
        duration: 0.5,
      })
      .to(stepsRefs.current[0], {
        width: "0%",
        duration: 0,
      });
  };

  const secondStepAnim = (tl: ReturnType<typeof gsap.timeline>) => {
    tl.to(stepsRefs.current[1], {
      width: "100%",
      duration: 12,
      onComplete: () => {
        setCurrentStep(0);
      },
    })
      .to(stepsRefs.current[1], {
        opacity: 0,
        duration: 0.5,
      })
      .to(stepsRefs.current[1], {
        width: "0%",
        duration: 0,
      });
  };

  const moveRuble = () => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isVerticalTablet: `(min-width: ${
          BREAKPOINTS.verticalTablet
        }px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
        isTablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${
          BREAKPOINTS.laptop - 1
        }px)`,
        isLaptop: `(min-width: ${BREAKPOINTS.laptop}px) and (max-width: ${
          BREAKPOINTS.desktop - 1
        }px)`,
        isDesktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
      },
      (context) => {
        const { isTablet, isLaptop, isDesktop } = context.conditions as any;

        gsap.to(rubleRef.current, {
          x: isDesktop
            ? "21.83vw"
            : isLaptop
            ? "340px"
            : isTablet
            ? "380px"
            : "320px",
          ease: "sine.inOut",
          duration: 4,
          repeat: -1,
        });
      }
    );
  };

  const moveCoins = () => {
    const mm = gsap.matchMedia();
    const tl = gsap.timeline({ repeat: -1 });

    mm.add(
      {
        isVerticalTablet: `(min-width: ${
          BREAKPOINTS.verticalTablet
        }px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
        isTablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${
          BREAKPOINTS.laptop - 1
        }px)`,
        isLaptop: `(min-width: ${BREAKPOINTS.laptop}px) and (max-width: ${
          BREAKPOINTS.desktop - 1
        }px)`,
        isDesktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
      },
      (context) => {
        const { isTablet, isLaptop, isDesktop } = context.conditions as any;

        coinsRefs.current.forEach((_, inx) => {
          tl.to(
            coinsRefs.current[inx],
            {
              keyframes: [
                {
                  x: `${
                    (isDesktop
                      ? 10.915
                      : isLaptop
                      ? 170
                      : isTablet
                      ? 220
                      : 180) *
                    (1 - (isLaptop ? 0.15 : 0.07) * inx)
                  }${isDesktop ? "vw" : "px"}`,
                  duration: 2,
                  delay: inx * 1,
                  ease: "sine.inOut",
                },
                {
                  x: `${
                    (isDesktop
                      ? 10.915
                      : isLaptop
                      ? 170
                      : isTablet
                      ? 220
                      : 180) *
                    (1 - (isLaptop ? 0.15 : 0.07) * inx)
                  }${isDesktop ? "vw" : "px"}`,
                  duration: 2.25,
                },
                {
                  x: `${
                    isDesktop ? 21.83 : isLaptop ? 340 : isTablet ? 380 : 320
                  }${isDesktop ? "vw" : "px"}`,
                  delay: inx * -1,
                  ease: "sine.inOut",
                  duration: 2 * (1 + (isLaptop ? 0.15 : 0.07) * inx),
                },
              ],
            },
            inx === 0 ? ">" : "<"
          );
        });
      }
    );
  };

  const desciptions = useMemo(
    () => [
      ["Ваша компания в РФ", "Иностранная компания"],
      ["Счёт нерезидента в РФ", "Ваш поставщик"],
    ],
    []
  );

  const coins = [EUR, USD, CNY];

  return (
    <section id="payments" className={`${styles.payments}`}>
      <div className={`${styles.paymentsContainer}`}>
        <div className={`${styles.paymentsTitleWrapper}`}>
          <h2 className={`${styles.paymentsTitle} section-title`}>
            Схема платежей
          </h2>

          <div className={`${styles.paymentsContentText}`}>
            <h3 className={`${styles.paymentsContentTitle} section-subtitle`}>
              Работаем с зарубежными поставщиками через сеть иностранных
              компаний по простой и прозрачной системе
            </h3>
          </div>
        </div>

        <div className={`${styles.card}`}>
          <div className={`${styles.stepsContainer}`}>
            <div className={`${styles.step}`}>
              <button
                className={`${styles.stepDescription}`}
                onClick={() => setCurrentStep(0)}
              >
                <p className={`${styles.count}`}>Шаг 1</p>
                <p
                  className={`${styles.title} ${
                    currentStep === 1 ? "!text-[#898C98]" : "!text-black"
                  }`}
                >
                  Оплата в рублях
                </p>
              </button>

              <div
                ref={(node) => {
                  stepsRefs.current.push(node!);
                }}
                className={`${styles.stepProgress}`}
              ></div>
            </div>

            <div className={`${styles.step}`}>
              <button
                className={`${styles.stepDescription}`}
                onClick={() => setCurrentStep(1)}
              >
                <p className={`${styles.count}`}>Шаг 1</p>
                <p
                  className={`${styles.title} ${
                    currentStep === 0 ? "!text-[#898C98]" : "!text-black"
                  }`}
                >
                  Оплата в рублях
                </p>
              </button>

              <div
                ref={(node) => {
                  stepsRefs.current.push(node!);
                }}
                className={`${styles.stepProgress}`}
              ></div>
            </div>
          </div>

          <div className={`${styles.cardContentWrapper}`}>
            <div className={`${styles.animationContainer}`}>
              <div className={`${styles.animation}`}>
                <Ruble
                  ref={rubleRef}
                  className={`${styles.coin} lg:!size-[36px] ${
                    currentStep === 1 ? "hidden" : "block"
                  }`}
                />

                {coins.map((Coin, inx) => (
                  <Coin
                    ref={(node: SVGElement) => {
                      coinsRefs.current[inx] = node!;
                    }}
                    key={inx}
                    className={`${
                      styles.coin
                    } 3xl:!top-[4%] xl:!top-[-6%] lg:!top-[10%] ${
                      currentStep === 0 ? "hidden" : "block"
                    }`}
                  />
                ))}

                <div className={`${styles.from}`}>
                  <div
                    ref={(node) => {
                      descriptionRefs.current.push(node!);
                    }}
                  >
                    <p className="opacity-0">{desciptions[0][currentStep]}</p>

                    {desciptions[0].map((desciption, inx) => (
                      <span
                        key={inx}
                        className={`${styles.blockTitle} ${
                          currentStep === inx ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {desciption}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`${styles.path}`}>
                  <Agreement className={`${styles.agreement}`} />
                  <p>Агентский договор</p>
                </div>

                <div
                  ref={(node) => {
                    descriptionRefs.current.push(node!);
                  }}
                  className={`${styles.to}`}
                >
                  <div>
                    <p className="opacity-0">{desciptions[0][currentStep]}</p>

                    {desciptions[0].map((desciption, inx) => (
                      <span
                        key={inx}
                        className={`${styles.blockTitle} ${
                          currentStep === inx ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {desciption}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className={`${styles.cardDescription}`}>
                Оплатите сумму для оплаты поставщику и комиссию в рублях на счёт
                компании-нерезидента по агентсткому договору
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
