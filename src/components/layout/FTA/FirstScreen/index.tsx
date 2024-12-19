import Button from "@/components/ui/buttons/Button";
import styles from "./FirstScreen.module.css";

export default function FirstScreen() {
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
          <h2>Международные платежи.</h2>
        </div>

        <div className={`${styles.descriptionBlock}`}>
          <p>
          Помогаем бизнесу легально вести расчёты с зарубежными поставщиками и клиентами без банковских ограничений
          </p>

          <Button theme="red">
            <span className="hidden xl:block">Заказать перестановку в TG-боте</span>
            <span className="xl:hidden">получить консультацию</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
