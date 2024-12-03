import Link from "next/link";
import styles from "./Header.module.css";
import IconButton from "../ui/buttons/IconButton";
import TelegramIcon from "@/svg/telegram.svg";

export default function Header() {
  return (
    <div className={`${styles.navbar}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.logo}`}>
          <div className={`${styles.dots}`}>
            <div></div>
            <div className={`${styles.redDot}`}></div>
          </div>

          <h1>SKYNET</h1>
        </div>

        <nav>
          <ul>
            {Array.from({ length: 4 }).map((_, inx) => (
              <li key={inx}>
                <Link href="/">USDT – FIAT</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <IconButton icon={TelegramIcon} className={`${styles.telegram}`}>
            TG-Бот
          </IconButton>
        </div>
      </div>
    </div>
  );
}
