"use client";

import Image from "next/image";
import styles from "./ComingSoonModal.module.css";
import { useModal } from "@/providers/ModalProvider";

export default function ComingSoonModal() {
  const { isOpen, closeModal } = useModal();

  return (
    <div
      className={`${styles.modalWrapper} ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        className={`${styles.modalContrainer} ${
          isOpen ? "translate-y-0" : "translate-y-10"
        }`}
      >
        <div className={`${styles.closeWrapper}`}>
          <div className={`${styles.closeContainer}`} onClick={closeModal}>
            <Image src="/images/close.png" fill alt="close" />
          </div>
        </div>

        <div className={`${styles.tgBot}`}>
          <p>TG-бот</p>

          <div className={`${styles.mascotWrapper}`}>
            <div className={`${styles.mascotContainer}`}>
              <Image
                src={"/images/coming-soon-mascot.png"}
                fill
                alt=""
                quality={40}
              />
            </div>
          </div>
        </div>
        <p className={`${styles.comingSoon}`}>
          coming soon<span className="text-primary-red">.</span>
        </p>
      </div>
    </div>
  );
}
