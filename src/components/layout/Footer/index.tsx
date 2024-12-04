import Button from "@/components/ui/buttons/Button";
import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={`${styles.footer}`}>
      <div className={`${styles.footerContent}`}>
        <div className={`${styles.footerTop}`}>
          <div className={`${styles.footerMascot}`}></div>

          <div className={`${styles.footerLinks}`}>
            <div className={`${styles.goToTelegram}`}>
              <p>
                Закажите оплату, перевод, обмен или консультацию уже сегодня
                в нашем Telegram-боте{" "}
              </p>

              <Button theme="red">Перейти в Telegram</Button>
            </div>

            <div className={`${styles.footerLinksGrid}`}>
              <div
                className={`${styles.footerLinksNav} ${styles.footerLinksGridItem}`}
              >
                <h5>Навигация</h5>

                <div className={`${styles.footerLinksList}`}>
                  <ul>
                    {Array.from({ length: 5 }).map((_, inx) => (
                      <li key={inx}>
                        <Link href="/">Главная</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`${styles.footerContacts} ${styles.footerLinksGridItem}`}
              >
                <h5>Контакты</h5>

                <div className={`${styles.footerContactsList}`}>
                  {Array.from({ length: 3 }).map((_, inx) => (
                    <a key={inx} href={""}>
                      email@example.com
                    </a>
                  ))}
                </div>
              </div>

              <div
                className={`${styles.footerSubscribe} ${styles.footerLinksGridItem}`}
              >
                <h5>Подпишитесь, чтобы получать наши статьи</h5>

                <div>
                  <Button>Подписаться</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.footerBottom}`}>
          <p className={`${styles.footerBottomLogo}`}>SKYNET</p>

          <div className={`${styles.bottomLinks}`}>
            <div className={`${styles.bottomLinksItem}`}>
              <a href="/privacy-policy" target="_blank">
                Политика конфиденциальности
              </a>

              <p>© {new Date().getFullYear()} Все права защищены</p>
            </div>

            <a href="https://skynet.agency" target="_blank">
              Разработка сайта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
