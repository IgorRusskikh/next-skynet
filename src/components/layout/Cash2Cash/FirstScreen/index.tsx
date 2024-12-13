import Button from "@/components/ui/buttons/Button";
import Image from "next/image";
import styles from "./FirstScreen.module.css";

export default function FirstScreen() {
  return (
    <section className={`${styles.firstScreen}`}>
      <div className={`${styles.firstScreenContent}`}>
        <h1>
          Сash2cash<span className="text-primary-red">.</span>
        </h1>

        <div className={`${styles.content}`}>
          <div className={`${styles.typingBlock}`}>
            <h2>Любая валюта.</h2>
          </div>

          <div className={`${styles.descriptionBlock}`}>
            <p>
              Перемещаем средства и выдаём в любой удобной валюте в наших
              офисах, через сеть партнёров или доставкой курьером
            </p>

            <Button theme="red">Заказать перестановку в TG-боте</Button>
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
