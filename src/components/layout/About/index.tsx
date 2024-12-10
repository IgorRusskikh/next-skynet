"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import styles from "./About.module.css";
import gsap from "gsap";
import { BREAKPOINTS } from "@/constants";

export default function About() {
  const [isOpen, setIsOpen] = useState(0);
  const [step, setStep] = useState(0);

  const numberRef = useRef<HTMLSpanElement>(null);
  const advantageTextRef = useRef<HTMLParagraphElement>(null);

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

  const numberDescription = useMemo(
    () => ["млрд. рублей в год", "клиентов", "стран работы"],
    []
  );

  return (
    <section id="about" className={`${styles.about}`}>
      <div className={`${styles.aboutContent}`}>
        <p className={`${styles.aboutTitle}`}>
          Там, где большие финансы встречаются с абсолютной надежностью
          <span className="text-primary-red">.</span>
        </p>

        <div className={`${styles.advantages}`}>
          <p className={`${styles.advantagesText} relative z-20`}>
            Каждый день мы осуществляем операции в криптовалюте для частных лиц
            и крупных компаний, которые доверяют нам свои финансы {step}
          </p>

          <div className={`md:max-w-[501px] lg:max-w-[65%] w-full text-right`}>
            <div className={`${styles.advantageItem}`}>
              <div className={`${styles.advantageNumberWrapper}`}>
                <span className={`${styles.advantageNumber}`} ref={numberRef}>
                  {step === 0 ? 150 : step === 1 ? 1000 : 30}
                </span>
                <span className={`${styles.advantagePlus}`}>+</span>
              </div>

              <p className={`${styles.advantageText}`} ref={advantageTextRef}>
                {numberDescription.map((item, inx) => (
                  <span
                    key={inx}
                    className={`${
                      step === inx
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible translate-y-4"
                    }`}
                  >
                    {item}
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
