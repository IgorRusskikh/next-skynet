"use client";

import Button from "@/components/ui/buttons/Button";
import styles from "./FirstScreen.module.css";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import useTypeText from "@/hooks/useTypeText";

export default function FirstScreen() {
  const typingTextRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef(null);

  const t = useTranslations("VED.FirstScreen");

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
          <p>{t("title.0")}</p>
          <p className={`${styles.bottomLine}`}>
            {t("title.1")}<span className="text-primary-red">.</span>
          </p>
        </h1>

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
          <p dangerouslySetInnerHTML={{ __html: t.raw("tg.description") }} />

          <Button theme="red">
            {t('tg.button')}
          </Button>
        </div>
      </div>
    </section>
  );
}
