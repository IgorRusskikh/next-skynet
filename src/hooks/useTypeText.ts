import { RefObject, useEffect } from "react";

import gsap from "gsap";

interface Args {
  typingTextRef: RefObject<HTMLElement>,
  cursorRef: RefObject<HTMLElement>,
  texts: string[],
}

export default function useTypeText({ typingTextRef, cursorRef, texts }: Args) {
  useEffect(() => {
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

    const tl = gsap.timeline({ repeat: -1 });

    texts.forEach((text) => {
      text.split("").forEach((letter) => {
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

      [...text].forEach(() => {
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
    });
  }, [typingTextRef, cursorRef, texts]);
}