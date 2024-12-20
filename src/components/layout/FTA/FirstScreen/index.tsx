'use client'

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
          <p>Платежи</p>
          <p className={`${styles.bottomLine}`}>
            для вэд<span className="text-primary-red">.</span>
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
          <p>
            Помогаем бизнесу легально вести расчёты с зарубежными поставщиками и
            клиентами без банковских ограничений
          </p>

          <Button theme="red">
            <span className="hidden xl:block">
              Заказать перестановку в TG-боте
            </span>
            <span className="xl:hidden">получить консультацию</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
