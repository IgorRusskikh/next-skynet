"use client";

import { HTMLAttributes, useEffect, useMemo, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import Arrow from "@/svg/fs-arrow.svg";
import Button from "@/components/ui/buttons/Button";
import Image from "next/image";
import gsap from "gsap";
import styles from "./FirstScreen.module.css";
import { useModal } from "@/providers/ModalProvider";

interface IAdvantage extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function FirstScreen() {
  const arrowsRefs = useRef<SVGElement[]>([]);

  const { openModal } = useModal();

  const t = useTranslations("Index.FirstScreen");
  const locale = useLocale();

  useEffect(() => {
    gsap.to(arrowsRefs.current[0], {
      keyframes: [
        {
          x: 0,
        },
        {
          x: "100%",
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
          x: "-100%",
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
          x: "-100%",
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
          x: "100%",
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

  const mobileAdvatages = useMemo(
    () => [
      [advantages[1], advantages[3], advantages[0]],
      [advantages[2], advantages[4]],
    ],
    []
  );

  return (
    <>
      <section className={styles.firstScreen}>
        <div className={styles.firstScreenContent}>
          <div className={`${styles.firstScreenContentTopWrapper}`}>
            <div
              className={`${styles.firstScreenContentTop} ${
                locale === "en" ? styles.firstScreenContentTopEn : ""
              }`}
            >
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
              <p
                dangerouslySetInnerHTML={{ __html: t.raw("title.bottom-line") }}
                className={`${
                  locale === "en" ? styles.firstScreenContentTopItemEn : ""
                }`}
              ></p>
            </div>

            <div className={`${styles.firstScreenContentBottomWrapper}`}>
              <p
                className={`${styles.firstScreenContentBottom} ${
                  locale === "en" ? styles.firstScreenContentBottomEn : ""
                }`}
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
              <div
                className={`${styles.bannerContent} ${
                  locale === "en" ? styles.bannerContentEn : ""
                }`}
              >
                <div
                  className={`${styles.advantages} ${
                    locale === "en" ? styles.advantagesEn : ""
                  } !hidden md:!flex`}
                >
                  {advantages.map((advantage) => (
                    <Advantage key={advantage}>{advantage}</Advantage>
                  ))}
                </div>

                <div className={`${styles.advantages} md:!hidden`}>
                  <div className="z-10">
                    {mobileAdvatages[0].map((advantage, index) => (
                      <Advantage key={advantage}>{advantage}</Advantage>
                    ))}
                  </div>

                  <div
                    className={`${styles.advantagesBottomRow} relative z-20`}
                  >
                    {mobileAdvatages[1].map((advantage, index) => (
                      <Advantage key={advantage}>{advantage}</Advantage>
                    ))}
                  </div>
                </div>

                <Button theme="red" onClick={openModal}>
                  {t("banner.consultation-button")}
                </Button>
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

            <div className={`${styles.mascotContainer} z-10`}>
              <div
                className={`${styles.mascot} ${
                  locale === "en" ? styles.mascotEn : ""
                }`}
              >
                <Image
                  src="/images/mascot.png"
                  fill
                  alt="mascot"
                  priority
                  quality={40}
                />
              </div>
            </div>
          </div>

          <div
            className={`${styles.descriptionContainer} ${
              locale === "en" ? styles.descriptionContainerEn : ""
            }`}
          >
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
