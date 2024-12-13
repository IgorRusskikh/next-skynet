"use client";

import { HTMLAttributes, useEffect, useRef } from "react";

import Africa from "@/svg/dots-africa.svg";
import Asia from "@/svg/dots-aisa.svg";
import Australia from "@/svg/dots-australia.svg";
import { BREAKPOINTS } from "@/constants";
import East from "@/svg/dots-east.svg";
import Europa from "@/svg/dots-europa.svg";
import LatinAmerica from "@/svg/dots-latin-america.svg";
import NorthAmerica from "@/svg/dots-north-america.svg";
import PointerSvg from "@/svg/map-pointer.svg";
import Russia from "@/svg/dots-russia.svg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "./Locations.module.css";

interface IPointerProps extends HTMLAttributes<HTMLDivElement> {}

export default function Locations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    pinAnimation();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(containerRef.current);
    };
  }, []);

  const pinAnimation = () => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isTablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${
          BREAKPOINTS.laptop - 1
        }px)`,
        isLaptop: `(min-width: ${BREAKPOINTS.laptop}px)`,
      },
      (conditions) => {
        const { isTablet, isLaptop } = conditions;

        gsap.to(containerRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${isLaptop ? 15 : 15}%`,
            end: "bottom+=20%",
            pin: true,
            scrub: true,
          },
          x: 0,
          ease: "none",
        });
      }
    );
  };

  return (
    <section id="locations" className={styles.locations}>
      <div ref={containerRef} className={`${styles.locationsContainer}`}>
        <div className={`${styles.locationsTitleWrapper}`}>
          <h2>География</h2>

          <div className={`${styles.locationsText}`}>
            <p className={`${styles.locationsTextTitle}`}>
              Получайте наличные в любой валюте там, где вам удобно
            </p>

            <p className={`${styles.locationsTextDescription}`}>
              Мы принимаем криптовалюту и FIAT, работаем с ведущими игроками и
              предоставляем удобные варианты получения средств по всему миру
            </p>
          </div>
        </div>

        <div className={`${styles.locationsMapWrapper}`}>
          <div className={`${styles.citiesList}`}></div>

          <div className={`${styles.locationsMap}`}>
            <div className={`${styles.locationsMapInner}`}>
              <div className={`${styles.northAmericaWrapper}`}>
                <NorthAmerica className={`${styles.northAmerica}`} />

                <Pointer className={`${styles.northAmericaPointer}`} />
              </div>

              <div className={`${styles.latinAmericaWrapper}`}>
                <LatinAmerica className={`${styles.latinAmerica}`} />
              </div>

              <div className={`${styles.africaWrapper}`}>
                <Africa className={`${styles.africa}`} />
              </div>

              <div className={`${styles.eastWrapper}`}>
                <East className={`${styles.east}`} />
              </div>

              <div className={`${styles.asiaWrapper}`}>
                <Asia className={`${styles.asia}`} />
              </div>

              <div className={`${styles.europaWrapper}`}>
                <Europa className={`${styles.europa}`} />
              </div>

              <div className={`${styles.russiaWrapper}`}>
                <Russia className={`${styles.russia}`} />
              </div>

              <div className={`${styles.australiaWrapper}`}>
                <Australia className={`${styles.australia}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pointer({ className }: IPointerProps) {
  return (
    <div className={`${styles.pointerWrapper} ${className}`}>
      <div className={`${styles.pointerInner}`}>
        <PointerSvg className={`${styles.pointer}`} />
      </div>
    </div>
  );
}
