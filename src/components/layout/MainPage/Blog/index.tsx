import Button from "@/components/ui/buttons/Button";
import styles from "./Blog.module.css";
import CustomLink from "@/components/ui/Link";
import Image from "next/image";
import Arrow from "@/svg/right-arrow.svg";

export default function Blog() {
  return (
    <section id="blog" className={`${styles.blog}`}>
      <div className={`${styles.blogContainer}`}>
        <div className={`${styles.blogTitleWrapper}`}>
          <h2 className={`${styles.blogTitle}`}>Блог</h2>

          <div className={`${styles.blogText}`}>
            <p className={`${styles.blogTextTitle}`}>
              <span className="text-black">
                Делимся знаниями и новостями о рынке криптовалют в нашем блоге.
              </span>{" "}
              Подпишитесь на рассылку, чтобы получать новости индустрии и
              узнавать больше о возможностях для переводов и платежей в
              криптовалюте
            </p>

            <Button theme="red">Подписаться</Button>
          </div>
        </div>

        <div className={`${styles.blogContent}`}>
          <div className={`${styles.controls}`}>
            <button className={`$`}>
              <Arrow width={12} height={12} className="rotate-180" />
            </button>
            <button className={`${styles.controlsActive}`}>
              <Arrow />
            </button>
          </div>

          <div className={`${styles.postList}`}>
            {Array.from({ length: 2 }).map((_, inx) => (
              <Post key={inx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Post() {
  return (
    <div className={`${styles.post}`}>
      <div className={`${styles.postImage}`}>
        <Image src="/images/blog/filler.png" fill alt="blog" />
      </div>
      <div className={`${styles.postContent}`}>
        <h3>
          Glacier Testnet Verifier Node Самое простое руководство по настройке
          Glacier Testnet Verifier Node Самое простое руководство по настройке
        </h3>

        <CustomLink href="/" className={`${styles.postLink}`}>
          Читать статью
        </CustomLink>
      </div>
    </div>
  );
}
