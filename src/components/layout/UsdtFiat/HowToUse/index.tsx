"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { BREAKPOINTS } from "@/constants";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "./HowToUse.module.css";

export default function HowToUse() {
  const [isStartAnim, setIsStartAnim] = useState(false);
  const [imposedCards, setImposedCards] = Array.from({ length: 4 }).map(
    () => false
  );

  const sectionRef = useRef(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<HTMLDivElement[]>([]);

  const t = useTranslations("UsdtFiat.HowToUse");
  const locale = useLocale();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    pinAnimation();
    moveCards();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const pinAnimation = () => {
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

        const endPoint = isDesktop
          ? "+=95%"
          : isLaptop
          ? "+=750px"
          : isVerticalTablet
          ? "+=58%"
          : isMobile
          ? locale === "en"
            ? "+=84%"
            : "+=84%"
          : "+=80%";

        gsap.to(pinRef.current, {
          scrollTrigger: {
            trigger: pinRef.current,
            start: `top-=${
              isDesktop
                ? -6
                : isLaptop
                ? -5
                : isTablet
                ? -4
                : isVerticalTablet
                ? -4
                : 5
            }%`,
            end: `bottom ${endPoint}`,
            pinSpacing: false,
            pin: true,
            scrub: true,
          },
        });
      }
    );
  };

  const moveCards = () => {
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

        const initialY = isMobile ? "250vw" : "120vh";
        const moveY = isDesktop
          ? 53
          : isLaptop
          ? 50
          : isTablet
          ? 42
          : isVerticalTablet
          ? 48
          : 59;

        cardsRefs.current.forEach((element, inx) => {
          gsap.fromTo(
            element,
            {
              y: `${initialY}`,
            },
            {
              keyframes: [
                {
                  opacity: isVerticalTablet ? 0 : 1,
                },
                {
                  opacity: 1,
                },
              ],
              y: `${
                moveY * (inx - 1) -
                (isDesktop
                  ? inx === 0
                    ? 0
                    : 5.6 * inx
                  : isLaptop
                  ? 0
                  : isTablet
                  ? 16
                  : isVerticalTablet
                  ? 4
                  : 18 * inx)
              }%`,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `top+=${inx * element.scrollHeight}px`,
                end: `top+=${
                  (inx + 1) *
                  element.scrollHeight *
                  (isDesktop ? 0.8 : isMobile ? 1.7 : 1)
                }px`,
                pinSpacing: false,
                scrub: isLaptop || isDesktop ? 0.8 : 0.5,
                onLeave: () => {
                  if (inx < cardsRefs.current.length - 1) {
                    gsap.to(element, { color: "#898C98", duration: 0.5 });
                  }
                  if (!isStartAnim) {
                    setIsStartAnim(true);
                  }
                },
                onEnterBack: () => {
                  if (inx === 0) {
                    setIsStartAnim(false);
                  }
                  element.style.color = "";
                },
              },
            }
          );
        });
      }
    );
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={`${styles.howToUse}`}
    >
      <div ref={pinRef} className={`${styles.contentWrapper}`}>
        <div className={`${styles.howToUseContainer}`}>
          <div
            className={`${styles.howToUseTitleWrapper} ${
              locale === "en" ? styles.howToUseTitleWrapperEn : ""
            }`}
          >
            <h2
              className={`${styles.howToUseTitle} section-title`}
              dangerouslySetInnerHTML={{ __html: t.raw("title") }}
            />

            <div className={`${styles.howToUseContentText}`}>
              <h3
                className={`${styles.howToUseContentTitle} section-subtitle`}
                dangerouslySetInnerHTML={{
                  __html: t.raw("subtitle"),
                }}
              />
              <p
                className={`${styles.howToUseContentDescription}`}
                dangerouslySetInnerHTML={{
                  __html: t.raw("description"),
                }}
              />
            </div>
          </div>

          <div
            className={`${styles.cards} ${
              locale === "en" ? styles.cardsEn : ""
            }`}
          >
            <div
              className={`${styles.card} ${
                isStartAnim ? "text-[#898C98]" : ""
              }`}
            >
              <div>
                <p className={`${styles.step}`}>{t("step")} 1</p>
                <h3
                  className={`${styles.title}`}
                  dangerouslySetInnerHTML={{ __html: t.raw("cards.0.title") }}
                />
              </div>
              <p
                className={`${styles.description}`}
                dangerouslySetInnerHTML={{
                  __html: t.raw("cards.0.description"),
                }}
              />
            </div>

            {Array.from({ length: 4 }).map((_, inx) => (
              <div
                ref={(node) => {
                  if (node) {
                    cardsRefs.current[inx] = node;
                  }
                }}
                key={inx}
                className={`${styles.card} absolute`}
              >
                <div>
                  <p className={`${styles.step}`}>
                    {t("step")} {inx + 2}
                  </p>
                  <h3
                    className={`${styles.title}`}
                    dangerouslySetInnerHTML={{
                      // @ts-expect-error: need a type
                      __html: t.raw(`cards.${inx + 1}.title`),
                    }}
                  />
                </div>
                <p
                  className={`${styles.description}`}
                  dangerouslySetInnerHTML={{
                    // @ts-expect-error: need a type
                    __html: t.raw(`cards.${inx + 1}.description`),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
