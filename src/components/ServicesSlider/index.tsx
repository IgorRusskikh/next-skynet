"use client";

import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";

import CustomLink from "../ui/Link";
import Image from "next/image";
import { service } from "../layout/MainPage/Services";
import styles from "./ServicesSlider.module.css";
import { useMemo } from "react";

interface IServicesSliderProps {
  services: IService[];
  images: string[];
}

interface IService extends service {}

export default function ServicesSlider({
  services,
  images,
}: IServicesSliderProps) {
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
                0{inx + 1}
                <span
                  className={`${styles.serviceSlideCountDash} text-[#898C98]`}
                >
                  -
                </span>
                <span className="text-[#898C98]">0{services.length}</span>
              </p>

              <div className={`${styles.serviceSlideImage}`}>
                <Image src={images[inx]} fill alt="" className="object-cover" />
              </div>

              <div className={`${styles.serviceSlideDescriptionWrapper}`}>
                <p
                  className={`${styles.serviceSlideDescription}`}
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />

                <CustomLink href={service.link}>{service.link}</CustomLink>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
