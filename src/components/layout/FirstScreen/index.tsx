import { HTMLAttributes } from "react";
import styles from "./FirstScreen.module.css";
import Image from "next/image";
import Button from "@/components/ui/buttons/Button";

interface IAdvantage extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function FirstScreen() {
  return (
    <>
      <section className={styles.firstScreen}>
        <div className={styles.firstScreenContent}>
          <div className={`${styles.firstScreenContentTopWrapper}`}>
            <div className={`${styles.firstScreenContentTop}`}>
              <p className={`${styles.firstScreenContentTopItem}`}>
                <span>USDT</span>
                <span>FIAT</span>
              </p>
              <p>Переводы и обмен. по всему миру.</p>
            </div>

            <div className={`${styles.firstScreenContentBottomWrapper}`}>
              <p className={`${styles.firstScreenContentBottom}`}>
                Обмениваем криптовалюту<br></br> и проводим крупные
                международные платежи для бизнеса и физических лиц
              </p>

              <Button
                theme="red"
                className={`${styles.firstScreenContentBottomButton}`}
              >
                Получить консультацию
              </Button>
            </div>
          </div>

          <div className={`${styles.bannerWrapper}`}>
            <div className={`${styles.banner}`}>
              <div className={`${styles.bannerContent}`}>
                <div className={`${styles.advantages} !hidden md:!flex`}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Advantage key={index}>Обмен криптовалют</Advantage>
                  ))}
                </div>

                <div className={`${styles.advantages} md:!hidden`}>
                  <div>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <Advantage key={index}>Обмен криптовалют</Advantage>
                    ))}
                  </div>

                  <div className={`${styles.advantagesBottomRow}`}>
                    {Array.from({ length: 2 }).map((_, index) => (
                      <Advantage key={index}>Обмен криптовалют</Advantage>
                    ))}
                  </div>
                </div>

                <Button theme="red">Получить консультацию</Button>
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
              <h3>
                Обмениваем криптовалюту и проводим крупные международные платежи
                для бизнеса и физических лиц
              </h3>

              <Button theme="red">Получить консультацию</Button>
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
