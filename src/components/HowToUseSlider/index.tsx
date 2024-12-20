import "swiper/css";

import { Dispatch, HTMLAttributes, SetStateAction, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./HowToUseSlider.module.css";
import { useTranslations } from "next-intl";

interface Props {
  setCurrentSlide: Dispatch<SetStateAction<number>>;
}

export default function HowToUseSlider({ setCurrentSlide }: Props) {
  const t = useTranslations("CashToCash.HowToUse");

  const stepsTitles: string[] = useMemo(
    // @ts-expect-error: need a type
    () => Object.values(t.raw("steps")).map(({ title }) => title),
    []
  );

  const stepsDescriptions: string[] = useMemo(
    // @ts-expect-error: need a type
    () => Object.values(t.raw("steps")).map(({ description }) => description),
    []
  );

  return (
    <Swiper
      className={"md:!hidden !px-[4.44vw]"}
      spaceBetween={8}
      slidesPerView={1.075}
      onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
    >
      {Array.from({ length: 4 }).map((_, inx) => (
        <SwiperSlide key={inx}>
          <div className={`${styles.card}`}>
            <p className={`${styles.slidesCount}`}>0{inx + 1} <span className="text-[#898C98]">—</span> <span className="text-[#898C98]">04</span></p>

            <div className={`${styles.cardContent}`}>
              <h4 dangerouslySetInnerHTML={{ __html: stepsTitles[inx] }} />
              <p dangerouslySetInnerHTML={{ __html: stepsDescriptions[inx] }} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
