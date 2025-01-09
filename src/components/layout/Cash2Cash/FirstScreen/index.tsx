"use client";

import Button from "@/components/ui/buttons/Button";
import Image from "next/image";
import styles from "./FirstScreen.module.css";
import { useModal } from "@/providers/ModalProvider";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import useTypeText from "@/hooks/useTypeText";

export default function FirstScreen() {
  const typingTextRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef(null);

  const { openModal } = useModal();

  const t = useTranslations("CashToCash.FirstScreen");

  useTypeText({
    typingTextRef,
    cursorRef,
    texts: Object.values(
      // @ts-expect-error: need a type
      t.raw("typing-text")
    ),
  });

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

            <Button theme="red" className="mx-auto" onClick={openModal}>
              {t("tg-bot")}
            </Button>
          </div>
        </div>
      </div>

      <div className={`${styles.mascotWrapper}`}>
        <div className={`${styles.mascotImage}`}>
          <Image src={"/images/mascot-cash2cash.png"} fill alt="Mascot" />

          <div className={`${styles.blurCircle}`}></div>
        </div>
      </div>
    </section>
  );
}
