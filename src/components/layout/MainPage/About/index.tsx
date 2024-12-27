"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { BREAKPOINTS } from "@/constants";
import gsap from "gsap";
import styles from "./About.module.css";
import { useTranslations } from "next-intl";

export default function About() {
  const [isOpen, setIsOpen] = useState(0);
  const [step, setStep] = useState(0);

  const numberRef = useRef<HTMLParagraphElement>(null);
  const advantageTextRef = useRef<HTMLParagraphElement>(null);

  const t = useTranslations("Index.AboutUs");

  useEffect(() => {
    if (step === 3) {
      setStep(0);
    }
  }, [step]);

  useEffect(() => {
    const tl = gsap.timeline();
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
        isVertical: `(min-width: ${
          BREAKPOINTS.verticalTablet
        }px) and (max-width: ${BREAKPOINTS.laptop - 1}px)`,
        isLaptop: `(min-width: ${BREAKPOINTS.laptop}px) and (max-width: ${
          BREAKPOINTS.desktop - 1
        }px)`,
        isDesktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
      },
      (context) => {
        const { isDesktop, isLaptop, isVertical, isMobile } =
          context.conditions as any;

        tl.to(numberRef.current, {
          keyframes: [
            {
              y: isDesktop
                ? "10vw"
                : isLaptop
                ? 130
                : isVertical
                ? 140
                : isMobile
                ? "22vw"
                : 130,
              delay: 1,
              duration: 0.8,
            },
            {
              y: 0,
              delay: 0,
              duration: 0.9,
            },
            {
              y: 0,
              delay: 0,
              duration: 0.6,
            },
          ],
          repeat: -1,
          ease: "none",
          onStart: () => {
            setTimeout(
              () => {
                setStep((prev) => prev + 1);
              },
              isMobile ? 1900 : 2000
            );
          },
          onRepeat: () => {
            setTimeout(
              () => {
                setStep((prev) => prev + 1);
              },
              isMobile ? 1900 : 2000
            );
          },
        });
      }
    );
  }, []);

  const advantages = useMemo(
    // @ts-expect-error: временно игнорируем ошибку, так как структура ключей не соответствует ожидаемым типам
    () => Object.values(t.raw("advantages")) as string[],
    []
  );

  return (
    <section id="about" className={`${styles.about}`}>
      <div className={`${styles.aboutContent}`}>
        <p className={`${styles.aboutTitle}`}>
          {t("title")}
          <span className="text-primary-red">.</span>
        </p>

        <div className={`${styles.advantages}`}>
          <p
            className={`${styles.advantagesText} relative z-20`}
            dangerouslySetInnerHTML={{ __html: t.raw("description") }}
          />

          <div className={`md:max-w-[501px] lg:max-w-[65%] w-full text-right`}>
            <div className={`${styles.advantageItem}`}>
              <div className={`${styles.advantageNumberWrapper}`}>
                <p className={`${styles.advantageNumber}`} ref={numberRef}>
                  {step === 0 ? (
                    <>
                      150<span className={`${styles.advantagePlus}`}>+</span>
                    </>
                  ) : step === 1 ? (
                    <>
                      1000<span className={`${styles.advantagePlus}`}>+</span>
                    </>
                  ) : (
                    <>
                      50<span className={`${styles.advantagePlus}`}>+</span>
                    </>
                  )}
                </p>
              </div>

              <p className={`${styles.advantageText}`} ref={advantageTextRef}>
                <span className="!relative opacity-0">{advantages[0]}</span>
                {advantages.map((advantage, inx) => (
                  <span
                    key={advantage}
                    className={`${
                      step === inx
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    {advantage}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={`${styles.clients}`}>
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
      </div> */}
    </section>
  );
}
