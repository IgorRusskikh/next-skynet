"use client";

import { HTMLAttributes, useEffect, useMemo, useRef, useState } from "react";

import Agreement from "@/svg/agreement.svg";
import { BREAKPOINTS } from "@/constants";
import CNY from "@/svg/cny.svg";
import EUR from "@/svg/euro.svg";
import Ruble from "@/svg/ruble.svg";
import USD from "@/svg/usd.svg";
import gsap from "gsap";
import styles from "./Payments.module.css";
import { useTranslations } from "next-intl";

interface Props extends HTMLAttributes<HTMLElement> {
  containerClassName?: string;
}

export default function Payments({ containerClassName, className }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const stepsRefs = useRef<HTMLDivElement[]>([]);
  const descriptionRefs = useRef<HTMLDivElement[]>([]);
  const rubleRef = useRef<SVGElement>(null);
  const coinsRefs = useRef<SVGElement[]>([]);

  const t = useTranslations("VED.Payment");

  useEffect(() => {
    const progressTl = gsap.timeline();

    gsap.killTweensOf(stepsRefs.current);
    gsap.killTweensOf(rubleRef.current);
    gsap.killTweensOf(coinsRefs.current);

    gsap.set(rubleRef.current, { x: 0, y: 0 });
    coinsRefs.current.forEach((coin) => {
      gsap.set(coin, { x: 0, y: 0 });
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
      duration: 13,
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
        isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
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
        const { isMobile, isVerticalTablet, isTablet, isLaptop, isDesktop } =
          context.conditions as any;

        gsap.to(rubleRef.current, {
          x: !isMobile
            ? isDesktop
              ? "21.83vw"
              : isLaptop
              ? "360px"
              : isTablet
              ? "380px"
              : "320px"
            : 0,
          y: isMobile ? "52vw" : 0,
          ease: "sine.inOut",
          duration: isVerticalTablet ? 4 : 3,
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
        isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
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
        const { isMobile, isVerticalTablet, isTablet, isLaptop, isDesktop } =
          context.conditions as any;

        coinsRefs.current.forEach((_, inx) => {
          tl.to(
            coinsRefs.current[inx],
            {
              keyframes: [
                {
                  x: !isMobile
                    ? `${
                        (isDesktop
                          ? 13.915
                          : isLaptop
                          ? 210
                          : isTablet
                          ? 240
                          : 180) *
                        (1 - (isLaptop ? 0.15 : 0.11) * inx)
                      }${isDesktop ? "vw" : "px"}`
                    : 0,
                  y: isMobile
                    ? `${26 * (1 - (isLaptop ? 0.15 : 0.25) * inx)}vw`
                    : 0,
                  duration: 2,
                  delay: inx * 1,
                  ease: "sine.inOut",
                },
                {
                  x: !isMobile
                    ? `${
                        (isDesktop
                          ? 13.915
                          : isLaptop
                          ? 210
                          : isTablet
                          ? 240
                          : 180) *
                        (1 - (isLaptop ? 0.12 : 0.11) * inx)
                      }${isDesktop ? "vw" : "px"}`
                    : 0,
                  y: isMobile
                    ? `${26 * (1 - (isLaptop ? 0.15 : 0.25) * inx)}vw`
                    : 0,
                  duration: isDesktop ? 2.25 : 2,
                },
                {
                  x: !isMobile
                    ? `${
                        isDesktop
                          ? 27.83
                          : isLaptop
                          ? 420
                          : isTablet
                          ? 440
                          : isVerticalTablet
                          ? 360
                          : 320
                      }${isDesktop ? "vw" : "px"}`
                    : 0,
                  y: isMobile ? `52vw` : 0,
                  delay: inx * -1,
                  ease: "sine.inOut",
                  duration:
                    2 *
                    (1 +
                      (isDesktop
                        ? 0.05
                        : isLaptop
                        ? 0.1
                        : isTablet
                        ? 0.1
                        : isVerticalTablet
                        ? 0.07
                        : 0.15) *
                        inx),
                },
              ],
            },
            inx === 0 ? ">" : "<"
          );
        });
      }
    );
  };

  const from = useMemo(
    () => [t("card.steps.0.from"), t("card.steps.1.from")],
    []
  );
  const to = useMemo(() => [t("card.steps.0.to"), t("card.steps.1.to")], []);

  const coins = [EUR, USD, CNY];

  return (
    <section id="payments" className={`${styles.payments} ${className}`}>
      <div className={`${styles.paymentsContainer} ${containerClassName}`}>
        <div className={`${styles.paymentsTitleWrapper}`}>
          <h2
            className={`${styles.paymentsTitle} section-title`}
            dangerouslySetInnerHTML={{ __html: t.raw("title") }}
          />

          <div className={`${styles.paymentsContentText}`}>
            <h3
              className={`${styles.paymentsContentTitle} section-subtitle`}
              dangerouslySetInnerHTML={{ __html: t.raw("subtitle") }}
            />
          </div>
        </div>

        <div className={`${styles.card}`}>
          <div className={`${styles.stepsContainer}`}>
            {Array.from({
              length: Object.values(
                // @ts-expect-error: need a type
                t.raw("card.steps")
              ).length,
            }).map((_, inx) => (
              <div key={inx} className={`${styles.step}`}>
                <button
                  className={`${styles.stepDescription}`}
                  onClick={() => setCurrentStep(inx)}
                >
                  <p className={`${styles.count}`}>{`${t("step")} ${
                    inx + 1
                  }`}</p>
                  <p
                    className={`${styles.title} ${
                      currentStep === inx ? "!text-black" : "!text-[#898C98]"
                    }`}
                  >
                    {
                      // @ts-expect-error: need a type
                      t(`card.steps.${inx}.step`)
                    }
                  </p>
                </button>

                <div
                  ref={(node) => {
                    stepsRefs.current.push(node!);
                  }}
                  className={`${styles.stepProgress}`}
                ></div>
              </div>
            ))}
          </div>

          <div className={`${styles.cardContentWrapper}`}>
            <div className={`${styles.animationContainer}`}>
              <div className={`${styles.animation}`}>
                <Ruble
                  ref={rubleRef}
                  className={`${styles.ruble} ${
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
                    <p className="opacity-0">{from[currentStep]}</p>

                    {from.map((fromText, inx) => (
                      <span
                        key={inx}
                        className={`${styles.blockTitle} ${
                          currentStep === inx ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {fromText}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`${styles.path}`}>
                  <Agreement className={`${styles.agreement}`} />
                  <p>
                    {
                      // @ts-expect-error: need a type
                      t(`card.steps.${currentStep}.within`)
                    }
                  </p>
                </div>

                <div
                  ref={(node) => {
                    descriptionRefs.current.push(node!);
                  }}
                  className={`${styles.to}`}
                >
                  <div>
                    <p className="opacity-0">{to[currentStep]}</p>

                    {to.map((toText, inx) => (
                      <span
                        key={inx}
                        className={`${styles.blockTitle} ${
                          currentStep === inx ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {toText}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p
                className={`${styles.cardDescription}`}
                dangerouslySetInnerHTML={{
                  // @ts-expect-error: need a type
                  __html: t.raw(`card.steps.${currentStep}.description`),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
