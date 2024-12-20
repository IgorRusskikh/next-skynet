"use client";

import { HTMLAttributes, useEffect, useMemo, useRef } from "react";
import styles from "./FirstScreen.module.css";
import Image from "next/image";
import Button from "@/components/ui/buttons/Button";
import { useTranslations } from "next-intl";
import Arrow from "@/svg/fs-arrow.svg";
import gsap from "gsap";

interface IAdvantage extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function FirstScreen() {
  const arrowsRefs = useRef<SVGElement[]>([]);

  const t = useTranslations("Index.FirstScreen");

  useEffect(() => {
    gsap.to(arrowsRefs.current[0], {
      keyframes: [
        {
          x: 0,
        },
        {
          x: 50,
        },
        {
          rotate: "180deg",
        },
        {
          x: 0,
        },
        {
          x: 0,
          duration: 0.8,
        },
        {
          x: -50,
        },
        {
          rotate: "0deg",
        },
        {
          x: 0,
        },
      ],
      repeat: -1,
      duration: 4,
    });

    gsap.to(arrowsRefs.current[1], {
      keyframes: [
        {
          x: 0,
        },
        {
          x: -50,
        },
        {
          rotate: "0deg",
        },
        {
          x: 0,
        },
        {
          x: 0,
          duration: 0.8,
        },
        {
          x: 50,
        },
        {
          rotate: "180deg",
        },
        {
          x: 0,
        },
      ],
      repeat: -1,
      duration: 4,
    });
  }, []);

  const advantages = useMemo(
    // @ts-expect-error: need an interface
    () => Object.values(t.raw("banner.advantages")) as string[],
    []
  );

  console.log(arrowsRefs);

  return (
    <>
      <section className={styles.firstScreen}>
        <div className={styles.firstScreenContent}>
          <div className={`${styles.firstScreenContentTopWrapper}`}>
            <div className={`${styles.firstScreenContentTop}`}>
              <p className={`${styles.firstScreenContentTopItem}`}>
                <span>{t("title.top-line.usdt")}</span>
                <span className={`${styles.arrowsContainer}`}>
                  <Arrow
                    ref={(node: SVGElement) => {
                      arrowsRefs.current.push(node);
                    }}
                  />
                  <Arrow
                    ref={(node: SVGElement) => {
                      arrowsRefs.current.push(node);
                    }}
                    className={`rotate-180`}
                  />
                </span>
                <span>{t("title.top-line.fiat")}</span>
              </p>
              <p>{t("title.bottom-line")}</p>
            </div>

            <div className={`${styles.firstScreenContentBottomWrapper}`}>
              <p
                className={`${styles.firstScreenContentBottom}`}
                dangerouslySetInnerHTML={{ __html: t.raw("description") }}
              ></p>

              <Button
                theme="red"
                className={`${styles.firstScreenContentBottomButton}`}
              >
                {t("banner.consultation-button")}
              </Button>
            </div>
          </div>

          <div className={`${styles.bannerWrapper}`}>
            <div className={`${styles.banner}`}>
              <div className={`${styles.bannerContent}`}>
                <div className={`${styles.advantages} !hidden md:!flex`}>
                  {advantages.map((advantage) => (
                    <Advantage key={advantage}>{advantage}</Advantage>
                  ))}
                </div>

                <div className={`${styles.advantages} md:!hidden`}>
                  <div>
                    {advantages.map((advantage, index) => (
                      <Advantage key={advantage}>{advantage}</Advantage>
                    ))}
                  </div>

                  <div className={`${styles.advantagesBottomRow}`}>
                    {advantages.map((advantage, index) => (
                      <Advantage key={advantage}>{advantage}</Advantage>
                    ))}
                  </div>
                </div>

                <Button theme="red">{t("banner.consultation-button")}</Button>
              </div>

              <div className={`${styles.bigGradientGlassWrapper}`}>
                <div className={`${styles.bigGradientGlass}`}>
                  <Image
                    src="/images/big-gradient-glass.png"
                    fill
                    alt="big-gradient-glass"
                  />
                </div>
              </div>

              <div className={`${styles.smallGradientGlassWrapper}`}>
                <div className={`${styles.smallGradientGlass}`}>
                  <Image
                    src="/images/small-gradient-glass.png"
                    fill
                    alt="small-gradient-glass"
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.mascotContainer}`}>
              <div className={`${styles.mascot}`}>
                <Image src="/images/mascot.png" fill alt="mascot" />
              </div>
            </div>
          </div>

          <div className={`${styles.descriptionContainer}`}>
            <div className={`${styles.description}`}>
              <h3
                dangerouslySetInnerHTML={{ __html: t.raw("description") }}
              ></h3>

              <Button theme="red">{t("banner.consultation-button")}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Advantage({ children, className }: IAdvantage) {
  return (
    <div className={`${styles.advantage} ${className}`}>
      <h2>{children}</h2>
    </div>
  );
}
