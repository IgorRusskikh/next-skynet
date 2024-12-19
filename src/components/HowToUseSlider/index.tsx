import "swiper/css";

import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./HowToUseSlider.module.css";

interface Props {
  currentSlide: number;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
}

export default function HowToUseSlider({
  currentSlide,
  setCurrentSlide,
}: Props) {
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
            <p className={`${styles.slidesCount}`}>0{inx + 1} — 04</p>
            
            <div className={`${styles.cardContent}`}>
              <h4>Укажите детали перестановки в TG-боте</h4>
              <p>
                Выберите валюту отправки и получения и локации, в которых удобно
                отдать и получить средства
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
