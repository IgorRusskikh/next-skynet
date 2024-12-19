"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";

import Africa from "@/svg/dots-africa.svg";
import Asia from "@/svg/dots-aisa.svg";
import AsiaLine from "@/svg/asia-line.svg";
import Australia from "@/svg/dots-australia.svg";
import { BREAKPOINTS } from "@/constants";
import East from "@/svg/dots-east.svg";
import Europa from "@/svg/dots-europa.svg";
import EuropeLine from "@/svg/europe-line.svg";
import Image from "next/image";
import LatinAmerica from "@/svg/dots-latin-america.svg";
import LocationsAdaptive from "@/components/LocationsAdaptive";
import NorthAmerica from "@/svg/dots-north-america.svg";
import PointerSvg from "@/svg/map-pointer.svg";
import Russia from "@/svg/dots-russia.svg";
import RussiaLine from "@/svg/russia-line.svg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "./Locations.module.css";

const REGIONS = [
  {
    name: "northAmerica",
    Component: NorthAmerica,
    Line: null,
    AdaptiveLine: null,
  },
  {
    name: "latinAmerica",
    Component: LatinAmerica,
    Line: null,
    AdaptiveLine: null,
  },
  { name: "africa", Component: Africa, Line: null, AdaptiveLine: null },
  { name: "east", Component: East, Line: null, AdaptiveLine: null },
  {
    name: "asia",
    Component: Asia,
    Line: "asia-line",
    AdaptiveLine: AsiaLine,
  },
  {
    name: "europa",
    Component: Europa,
    Line: "europa-line",
    AdaptiveLine: EuropeLine,
  },
  {
    name: "russia",
    Component: Russia,
    Line: "russia-line",
    AdaptiveLine: RussiaLine,
  },
  { name: "australia", Component: Australia, Line: null, AdaptiveLine: null },
] as const;

export default function Locations() {
  const [hoveredCountries, setHoveredCountries] = useState(
    Array.from({ length: REGIONS.length }).map(() => false)
  );

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

  const setHoveredPoint = (inx: number) => {
    setHoveredCountries(
      hoveredCountries.map((idHovered, countryInx) =>
        countryInx === inx ? true : idHovered
      )
    );
  };

  const setUnhoveredPoint = (inx: number) => {
    if (window.innerWidth >= 1280) {
      setHoveredCountries(
        hoveredCountries.map((idHovered, countryInx) =>
          countryInx === inx ? false : idHovered
        )
      );
    }
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
          <LocationsAdaptive />

          <div className={`${styles.locationsMap} text-[#DFE2E9]`}>
            <div className={`${styles.locationsMapInner}`}>
              {REGIONS.map(({ name, Component, Line, AdaptiveLine }, inx) => (
                <div key={name} className={`${styles[`${name}Wrapper`]}`}>
                  <Component
                    className={`${
                      styles[name]
                    } transition-all duration-500 ease-in-out ${
                      hoveredCountries[inx] ? "!text-primary-red" : ""
                    }`}
                  />

                  {name !== "australia" && (
                    <Pointer
                      className={`${styles[`${name}Pointer`]}`}
                      lineWrapperClassName={`${
                        styles[`${name}PointerLineWrapper`]
                      }`}
                      lineClassName={`${styles[`${name}Line`]}`}
                      citiesContainerClassName={`${
                        styles[`${name}CitiesContainer`]
                      }`}
                      isHovered={hoveredCountries[inx]}
                      onMouseEnter={() => setHoveredPoint(inx)}
                      onClick={() => setHoveredPoint(inx)}
                      onMouseLeave={() => setUnhoveredPoint(inx)}
                      children={
                        Line && AdaptiveLine ? (
                          <>
                            {AdaptiveLine !== null && (
                              <Line className={`${styles[`${name}Line`]}`} />
                            )}
                            {Line !== null && AdaptiveLine !== null && (
                              <>
                                <div
                                  className={`relative ${
                                    styles[`${name}Line`]
                                  } `}
                                >
                                  <Image
                                    src={`/images/cash-to-cash/locations/${Line}-3xl.png`}
                                    fill
                                    alt=""
                                    className="hidden 3xl:block"
                                  />
                                  <Image
                                    src={`/images/cash-to-cash/locations/${Line}-xl.png`}
                                    fill
                                    alt=""
                                    className="hidden lg:block 3xl:hidden"
                                  />
                                </div>
                                {/* <AdaptiveLine
                                  className={`${
                                    styles[`${name}Line`]
                                  } block 3xl:hidden`}
                                /> */}
                              </>
                            )}
                          </>
                        ) : null
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface IPointerProps extends HTMLAttributes<HTMLDivElement> {
  lineWrapperClassName: string;
  lineClassName?: string;
  citiesContainerClassName?: string;
  isHovered?: boolean;
}

function Pointer({
  children,
  className,
  lineWrapperClassName,
  lineClassName,
  citiesContainerClassName,
  isHovered,
  ...props
}: IPointerProps) {
  console.log(children);

  return (
    <div
      className={`${styles.pointerWrapper} ${className}`}
    >
      <div className={`${styles.pointerInner}`}>
        <div
          className={`${lineWrapperClassName} transition-all duration-500 ease-in-out hidden lg:block ${
            isHovered ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          {children}

          {!children && (
            <div className={`${styles.pointerLine} ${lineClassName}`}></div>
          )}
          <div
            className={`absolute lg:ml-6 xl:ml-[28px] 3xl:ml-[1.25vw] min-w-[23.8vw] transition-all duration-500 ease-in-out ${citiesContainerClassName} ${
              isHovered ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <div className="relative">
              <h4 className={`${styles.country}`}>США и Канада</h4>

              <div className={`${styles.citiesList}`}>
                {Array.from({ length: 40 }).map((_, inx) => (
                  <p>🇺🇸 Нью-Йорк</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <PointerSvg className={`${styles.pointer}`} {...props} />
      </div>
    </div>
  );
}
