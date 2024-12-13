"use client";

import { useEffect, useMemo, useRef } from "react";
import styles from "./HowToUse.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { BREAKPOINTS } from "@/constants";
import { useTranslations } from "next-intl";

type step = {
  title: string;
  description: string;
};

export default function HowToUse() {
  const startAnimRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const titlesRefs = useRef<HTMLSpanElement[]>([]);
  const stepsCountRefs = useRef<HTMLSpanElement[]>([]);
  const stepsDescriptionRefs = useRef<HTMLSpanElement[]>([]);
  const imagesRefs = useRef<HTMLDivElement[]>([]);

  const t = useTranslations("Index.HowToUse");

  const mm = gsap.matchMedia();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    pinBannerAnim();
    showTitlesAnim();
    showStepsCountAnim();
    showStepsDescriptionAnim();
    showAndHidePhoneAnim();
    showAndHideTopCallImageAnim();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  const pinBannerAnim = () => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
        isVertical: `(min-width: ${BREAKPOINTS.verticalTablet}px)`,
      },
      (context) => {
        const { isMobile, isVertical } = context.conditions as any;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: parentRef.current,
            start: `top-=${isMobile ? "1%" : 125}`,
            end: "bottom bottom",
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
        });
      }
    );
  };

  const showTitlesAnim = () => {
    titlesRefs.current.forEach((title, inx) => {
      gsap.to(title, getHideAnimOptions(inx));
    });
  };

  const showStepsCountAnim = () => {
    const tl = gsap.timeline();

    stepsCountRefs.current.forEach((step, inx) => {
      mm.add(
        {
          isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
          isVerticalTablet: `(min-width: ${
            BREAKPOINTS.verticalTablet
          }px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
          isLaptop: `(min-width: ${BREAKPOINTS.laptop}px) and (max-width: ${
            BREAKPOINTS.desktop - 1
          }px)`,
          isDesktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
        },
        (context) => {
          const { isMobile, isVerticalTablet, isLaptop, isDesktop } =
            context.conditions as any;

          tl.to(stepsCountRefs.current[inx], {
            keyframes: [
              { y: 0, duration: 1 },
              {
                y: isMobile
                  ? "-20.67vw"
                  : isVerticalTablet
                  ? -120
                  : isDesktop
                  ? "-11vw"
                  : -168,
                duration: 1,
              },
              {
                y: isMobile
                  ? "-20.67vw"
                  : isVerticalTablet
                  ? -120
                  : isDesktop
                  ? "-11vw"
                  : -168,
                duration: 1,
              },
              {
                y:
                  inx === stepsCountRefs.current.length - 1
                    ? isMobile
                      ? "-20.67vw"
                      : isVerticalTablet
                      ? -120
                      : isDesktop
                      ? "-11vw"
                      : -168
                    : 0,
                duration: 1,
              },
            ],
            scrollTrigger: {
              trigger: startAnimRef.current,
              start: `top+=${(95 / 4.5) * inx}%`,
              end: `top+=${(95 / 4.5) * (inx + 1) - 2}%`,
              scrub: true,
            },
          });
        }
      );
    });
  };

  const showStepsDescriptionAnim = () => {
    const tl = gsap.timeline();

    stepsDescriptionRefs.current.forEach((step, inx) => {
      tl.to(step, getHideAnimOptions(inx));
    });
  };

  const showAndHidePhoneAnim = () => {
    mm.add(
      {
        isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
        isDesktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
        isLaptop: `(min-width: ${BREAKPOINTS.laptop}px) and (max-width: ${
          BREAKPOINTS.desktop - 1
        }px)`,
        isTablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${
          BREAKPOINTS.laptop - 1
        }px)`,
        isVerticalTablet: `(min-width: ${
          BREAKPOINTS.verticalTablet
        }px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
      },
      (context) => {
        const { isDesktop, isLaptop, isTablet, isVerticalTablet, isMobile } =
          context.conditions as any;

        gsap.to(imagesRefs.current[0], {
          keyframes: [
            {
              y: isDesktop
                ? "-2vw"
                : isLaptop
                ? 99
                : isTablet
                ? 60
                : isMobile
                ? "45vw"
                : 80,
              duration: 1,
              scale: 1,
            },
            {
              y: isDesktop
                ? "-2vw"
                : isLaptop
                ? 99
                : isTablet
                ? 60
                : isMobile
                ? "45vw"
                : 80,
              duration: 1,
            },
            {
              y: isDesktop
                ? "30vw"
                : isLaptop
                ? 450
                : isTablet
                ? 900
                : isMobile
                ? "160vw"
                : 600,
              duration: 1,
            },
          ],
          scrollTrigger: {
            trigger: startAnimRef.current,
            start: `top+=${(95 / 4) * 0 + 4}%`,
            end: `top+=${(95 / 4) * 1 - 4}%`,
            scrub: true,
          },
        });

        gsap.to(imagesRefs.current[2], {
          keyframes: [
            {
              y: isDesktop
                ? "-2vw"
                : isLaptop
                ? 99
                : isTablet
                ? 58
                : isMobile
                ? "45vw"
                : 100,
              duration: 1,
              scale: 1,
            },
            {
              y: isDesktop
                ? "-2vw"
                : isLaptop
                ? 99
                : isTablet
                ? 58
                : isMobile
                ? "45vw"
                : 100,
              duration: 1,
            },
            {
              y: isDesktop
                ? "30vw"
                : isLaptop
                ? 450
                : isTablet
                ? 450
                : isMobile
                ? "160vw"
                : 600,
              duration: 1,
            },
          ],
          scrollTrigger: {
            trigger: startAnimRef.current,
            start: `top+=${(95 / 4.5) * 2 + 4}%`,
            end: `top+=${(95 / 4.5) * 3}%`,
            scrub: true,
          },
        });

        gsap.to(imagesRefs.current[3], {
          keyframes: [
            {
              y: isDesktop
                ? "15vw"
                : isLaptop
                ? 270
                : isTablet
                ? 250
                : isMobile
                ? "63vw"
                : 170,
              duration: 1,
              scale: 1,
            },
            {
              y: isDesktop
                ? "15vw"
                : isLaptop
                ? 270
                : isTablet
                ? 250
                : isMobile
                ? "63vw"
                : 170,
              duration: 1,
            },
          ],
          scrollTrigger: {
            trigger: startAnimRef.current,
            start: `top+=${(95 / 4.5) * 3 + 4}%`,
            end: `top+=${(95 / 4.5) * 4 - (isDesktop ? 12 : 0)}%`,
            scrub: true,
          },
        });
      }
    );
  };

  const showAndHideTopCallImageAnim = () => {
    mm.add(
      {
        isDesktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
        isLaptop: `(min-width: ${BREAKPOINTS.laptop}px) and (max-width: ${
          BREAKPOINTS.desktop - 1
        }px)`,
        isTablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${
          BREAKPOINTS.laptop - 1
        }px)`,
        isVerticalTablet: `(min-width: ${
          BREAKPOINTS.verticalTablet
        }px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
        isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
      },
      (context) => {
        const { isDesktop, isLaptop, isTablet, isVerticalTablet, isMobile } =
          context.conditions as any;

        gsap.to(imagesRefs.current[1], {
          keyframes: [
            {
              y: isDesktop
                ? "17vw"
                : isLaptop
                ? 230
                : isTablet
                ? 200
                : isMobile
                ? "80vw"
                : 280,
              duration: 1,
            },
            {
              y: isDesktop
                ? "17vw"
                : isLaptop
                ? 230
                : isTablet
                ? 200
                : isMobile
                ? "80vw"
                : 280,
              duration: 1,
              opacity: 0.9,
            },
            { y: "-17vw", duration: 1, opacity: 0 },
          ],
          scrollTrigger: {
            trigger: startAnimRef.current,
            start: `top+=${(95 / 4.5) * 1 + 4}%`,
            end: `top+=${(95 / 4.5) * 2}%`,
            scrub: true,
          },
        });
      }
    );
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
        start: `top+=${(95 / 4.5) * inx + 5}%`,
        end: `top+=${(95 / 4.5) * (inx + 1) + 10}%`,
        scrub: true,
      },
    };
  };

  const bannerTitles = useMemo(
    () =>
      // @ts-expect-error: need an interface
      (Object.values(t.raw("steps")) as step[]).map((step) => step.title),
    []
  );
  const bannerStepDescription = useMemo(
    () =>
      // @ts-expect-error: need an interface
      (Object.values(t.raw("steps")) as step[]).map((step) => step.description),
    []
  );

  return (
    <section id="how-to-use" className={`${styles.howToUse}`}>
      <div className={`${styles.howToUseInner}`}>
        <div className={`${styles.sectionHeader}`}>
          <h2 className={`${styles.howToUseTitle}`}>{t("title")}</h2>

          <p className={`${styles.howToUseDescription}`}>
            {t.rich("subtitle", {
              "hidden-text": (chunks) => (
                <span className="!hidden md:!inline">{chunks}</span>
              ),
              span: (chunks) => (
                <span className="text-black inline">{chunks}</span>
              ),
            })}
          </p>

          <p className={`${styles.howToUseDescriptionText} md:!hidden`}>
            {t("mobile-subtitle")}
          </p>
        </div>

        <div ref={startAnimRef} className="h-fit overflow-clip">
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
                    dangerouslySetInnerHTML={{ __html: title }}
                  ></span>
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
                  <span
                    className="!relative invisible opacity-0"
                    dangerouslySetInnerHTML={{
                      __html:
                        t.raw("steps.0.description") +
                        "_______________________",
                    }}
                  ></span>

                  {bannerStepDescription.map((description, index) => (
                    <span
                      key={index}
                      ref={(node) => {
                        stepsDescriptionRefs.current[index] = node!;
                      }}
                      dangerouslySetInnerHTML={{ __html: description }}
                    ></span>
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
                    className="hidden lg:block"
                  />
                  <Image
                    src={"/images/how-to-use/phone-md.png"}
                    fill
                    alt="phone"
                    className="hidden md:block lg:hidden"
                  />
                  <Image
                    src={"/images/how-to-use/phone-xs.png"}
                    fill
                    alt="phone"
                    className="block md:hidden"
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
                    className="hidden lg:block"
                  />
                  <Image
                    src={"/images/how-to-use/phone-success-md.png"}
                    fill
                    alt="phone"
                    className="hidden md:block lg:hidden"
                  />
                  <Image
                    src={"/images/how-to-use/phone-success-xs.png"}
                    fill
                    alt="phone"
                    className="block md:hidden"
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
                    className="hidden lg:block"
                  />
                  <Image
                    src={"/images/how-to-use/transaction-success-md.png"}
                    fill
                    alt="transaction"
                    className="block lg:hidden"
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
