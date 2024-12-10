"use client";

import { HTMLAttributes, FC, useEffect, useRef } from "react";
import styles from "./Offices.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BREAKPOINTS } from "@/constants";

interface IOfficeCard extends HTMLAttributes<HTMLDivElement> {
  image: string;
  location: string;
  address: string;
  index: number;
}

export default function Offices(): JSX.Element {
  const officesBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
        isVerticalTablet: `(min-width: ${BREAKPOINTS.verticalTablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`,
        isDesktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
      },
      (context) => {
        const { isMobile, isVerticalTablet, isDesktop } =
          context.conditions as any;

        gsap.to(officesBlockRef.current, {
          x: -200,
          scrollTrigger: {
            trigger: officesBlockRef.current,
            start: `top-=${isMobile ? 350 : 200}%`,
            end: `bottom+=${isDesktop ? 600 : 30}%`,
            scrub: 0.8,
          },
        });
      }
    );

    return () => {
      mm.kill();
      gsap.killTweensOf(officesBlockRef.current);
    };
  }, []);

  return (
    <section id="offices" className={`${styles.offices}`}>
      <div className={`${styles.officesInner}`}>
        <div className={`${styles.officesTitleWrapper}`}>
          <h2 className={`${styles.officesTitle}`}>Офисы</h2>

          <div className={`${styles.officesText}`}>
            <p className={`${styles.officesTextTitle}`}>
              Работаем удалённо по всему миру, но всегда рады видеть вас в наших
              офисах
            </p>

            <p className={`${styles.officesTextDescription}`}>
              Приезжайте, чтобы познакомиться с нами лично, обсудить задачи и
              провести сделку
            </p>
          </div>
        </div>

        <div className={`${styles.officesContent}`}>
          <div className={`${styles.officesList}`}>
            <div
              className={`${styles.officesListWrapper}`}
              ref={officesBlockRef}
            >
              {images.map((image, index) => (
                <OfficeCard
                  key={index}
                  image={image}
                  location="Москва"
                  address="ул. улица, 18, офис 203"
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const images = ["moscow.png", "dubai.png", "ufa.png", "usa.png"];
const flags = ["🇷🇺", "🇦🇪", "🇷🇺", "🇺🇸"];

function OfficeCard({
  image,
  location,
  address,
  className,
  index,
  ...props
}: IOfficeCard) {
  return (
    <div
      className={`${styles.officesListItem} ${className}`}
      style={{ backgroundImage: `url('/images/offices/${image}')` }}
      {...props}
    >
      <div className={`${styles.location}`}>
        <span className={`${styles.locationFlag}`}>{flags[index]}</span>
        {location}
      </div>

      <div className={`${styles.address}`}>
        <p>{address}</p>
      </div>
    </div>
  );
}
