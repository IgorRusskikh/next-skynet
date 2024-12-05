'use client';

import { HTMLAttributes, FC, useEffect, useRef } from "react";
import styles from "./Offices.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface IOfficeCard extends HTMLAttributes<HTMLDivElement> {
  image: string;
  location: string;
  address: string;
}

export default function Offices(): JSX.Element {
  const officesBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(officesBlockRef.current, {
      x: -200,
      scrollTrigger: {
        trigger: officesBlockRef.current,
        start: "top-=200%",
        end: "bottom+=100",
        scrub: 0.8,
      },
    });

    return () => {
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
            <div className={`${styles.officesListWrapper}`} ref={officesBlockRef}>
              {images.map((image, index) => (
                <OfficeCard
                  key={index}
                  image={image}
                  location="Москва"
                  address="ул. улица, 18, офис 203"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const images = ["moscow.png", "dubai.png", "ufa.png", "moscow.png"];

function OfficeCard({
  image,
  location,
  address,
  className,
  ...props
}: IOfficeCard) {
  return (
    <div
      className={`${styles.officesListItem} ${className}`}
      style={{ backgroundImage: `url('/images/offices/${image}')` }}
      {...props}
    >
      <div className={`${styles.location}`}>
        <div className={`${styles.dot}`}></div>
        {location}
      </div>

      <div className={`${styles.address}`}>
        <p>{address}</p>
      </div>
    </div>
  );
}
