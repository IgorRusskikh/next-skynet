"use client";

import { useEffect, useRef } from "react";

import Button from "@/components/ui/buttons/Button";
import Image from "next/image";
import gsap from "gsap";
import styles from "./FirstScreen.module.css";
import { useTranslations } from "next-intl";

export default function FirstScreen() {
  const typingTextRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef(null);

  const t = useTranslations("CashToCash.FirstScreen");

  useEffect(() => {
    // @ts-expect-error: need a type
    const texts: string[] = Object.values(t.raw("typing-text"));
    const typingText = typingTextRef.current;
    const cursor = cursorRef.current;

    if (typingText) {
      typingText.textContent = "";
    }

    gsap.to(cursor, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
    });

    const tl = gsap.timeline();

    texts[0].split("").forEach((letter) => {
      tl.to(typingText, {
        duration: 0.1,
        onComplete: () => {
          if (typingText) {
            typingText.textContent += letter;
          }
        },
      });
    });

    tl.to({}, { duration: 1 });

    [...texts[0]].forEach(() => {
      tl.to(typingText, {
        duration: 0.05,
        onComplete: () => {
          if (typingText && typeof typingText.textContent === "string") {
            typingText.textContent = typingText.textContent.slice(0, -1);
          }
        },
      });
    });

    tl.to({}, { duration: 0.5 });

    texts[1].split("").forEach((letter) => {
      tl.to(typingText, {
        duration: 0.1,
        onComplete: () => {
          if (typingText) {
            typingText.textContent += letter;
          }
        },
      });
    });
  }, []);

  return (
    <section className={`${styles.firstScreen}`}>
      <div className={`${styles.firstScreenContent}`}>
        <h1>
          Сash2cash<span className="text-primary-red">.</span>
        </h1>

        <div className={`${styles.content}`}>
          <div className={`${styles.typingBlock}`}>
            <h2>
              <span ref={typingTextRef}></span>
              <span
                ref={cursorRef}
                className="text-primary-red xl:text-4xl 3xl:text-[3vw] font-extralight"
              >
                |
              </span>
            </h2>
          </div>

          <div className={`${styles.descriptionBlock}`}>
            <p dangerouslySetInnerHTML={{ __html: t.raw("description") }}></p>

            <Button theme="red" className="mx-auto">{t("tg-bot")}</Button>
          </div>
        </div>
      </div>

      <div className={`${styles.mascotWrapper}`}>
        <div className={`${styles.mascotImage}`}>
          <Image src={"/images/mascot.png"} fill alt="Mascot" />

          <div className={`${styles.blurCircle}`}></div>
        </div>
      </div>
    </section>
  );
}
