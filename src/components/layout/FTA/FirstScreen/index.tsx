"use client";

import Button from "@/components/ui/buttons/Button";
import Image from "next/image";
import styles from "./FirstScreen.module.css";
import { useModal } from "@/providers/ModalProvider";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import useTypeText from "@/hooks/useTypeText";

interface Props {
  tNamespace?: "VED" | "UsdtFiat";
}

export default function FirstScreen({ tNamespace = "VED" }: Props) {
  const typingTextRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef(null);

  const t = useTranslations(`${tNamespace}.FirstScreen`);

  const { openModal } = useModal();

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
            {t("title.1")}
            <span className="text-primary-red">.</span>
          </p>
        </h1>

        <div className={`${styles.typingBlock}`}>
          <h2>
            <span ref={typingTextRef}></span>
            <span
              ref={cursorRef}
              className="text-primary-red font-medium text-[7vw] md:text-3xl xl:text-4xl 3xl:text-[3vw]"
            >
              |
            </span>
          </h2>
        </div>

        <div
          className={`${
            styles[
              tNamespace === "VED" ? "descriptionBlock" : "descriptionBlockUsdt"
            ]
          }`}
        >
          <p dangerouslySetInnerHTML={{ __html: t.raw("tg.description") }} />

          <Button theme="red" onClick={openModal}>
            {t("tg.button")}
          </Button>
        </div>

        <div
          className={`${
            styles[tNamespace === "VED" ? "mascotWrapper" : "mascotWrapperUsdt"]
          }`}
        >
          <div
            className={`${
              styles[tNamespace === "VED" ? "mascotImage" : "mascotImageUsdt"]
            }`}
          >
            <Image
              src={`/images/mascot-${
                tNamespace === "VED" ? "ved" : "usdt"
              }.png`}
              fill
              alt="Mascot"
              priority
              quality={40}
            />

            <div
              className={`${
                styles[tNamespace === "VED" ? "blurCircle" : "blurCircleUsdt"]
              }`}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
