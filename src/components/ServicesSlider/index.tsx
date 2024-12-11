"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ServicesSlider.module.css";
import Image from "next/image";
import CustomLink from "../ui/Link";
import "swiper/css";
import { useMemo } from "react";

interface IServicesSliderProps {
  services: IService[];
}

interface IService {
  title: string;
  description: string;
  link: string;
  image: string;
}

export default function ServicesSlider({ services }: IServicesSliderProps) {
  const swiperOptions = useMemo(() => {
    return {
      slidesPerView: 1.05,
      spaceBetween: "2.22vw",
    };
  }, []);

  return (
    <Swiper className="md:!hidden !pl-[4.44vw] mt-[13.33vw]" {...swiperOptions}>
      {services.map((service, inx) => (
        <SwiperSlide key={inx}>
          <div className={`${styles.servicesSliderItem}`}>
            <h3>{service.title}</h3>

            <div className={`${styles.servicesSlideContent}`}>
              <p className={`${styles.serviceSlideCount}`}>
                {inx + 1}
                <span className={`${styles.serviceSlideCountDash}`}>-</span>
                {services.length}
              </p>

              <div className={`${styles.serviceSlideImage}`}>
                <Image
                  src={service.image}
                  fill
                  alt=""
                  className="object-cover"
                />
              </div>

              <div className={`${styles.serviceSlideDescriptionWrapper}`}>
                <p className={`${styles.serviceSlideDescription}`}>
                  {service.description}
                </p>

                <CustomLink href={service.link}>{service.link}</CustomLink>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}