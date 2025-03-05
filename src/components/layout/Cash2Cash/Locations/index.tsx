"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

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

  const t = useTranslations("CashToCash.Locations");
  const locale = useLocale();

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
        isLaptop: `(min-width: ${BREAKPOINTS.laptop}px) and (max-width: ${
          BREAKPOINTS.desktop - 1
        }px)`,
        isDesktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
      },
      (context) => {
        const { isMobile, isVerticalTablet, isTablet, isLaptop, isDesktop } =
          context.conditions as any;

        gsap.to(containerRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${isLaptop ? 10 : isDesktop ? 8 : isTablet ? 7 : 0}%`,
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

  const onClickHandler = (inx: number) => {
    if (window.innerWidth < 1280 && window.innerWidth >= 1024) {
      setHoveredCountries(
        hoveredCountries.map((_, countryInx) =>
          countryInx === inx ? true : false
        )
      );
    }
  };

  const onMouseEnterHandler = (inx: number) => {
    if (window.innerWidth >= 1280) {
      setHoveredCountries(
        hoveredCountries.map((idHovered, countryInx) =>
          countryInx === inx ? true : idHovered
        )
      );
    }
  };

  const onMouseLeaveHandler = (inx: number) => {
    if (window.innerWidth >= 1280) {
      setHoveredCountries(
        hoveredCountries.map((idHovered, countryInx) =>
          countryInx === inx ? false : idHovered
        )
      );
    }
  };

  const locations: { country: string; cities: string[] }[] =
    // @ts-expect-error need a type
    Object.values(t.raw("locations")).map((location) => {
      return {
        // @ts-expect-error need a type
        country: location.country,
        // @ts-expect-error need a type
        cities: Object.values(location.cities),
      };
    });

  return (
    <section id="locations" className={styles.locations}>
      <div ref={containerRef} className={`${styles.locationsContainer}`}>
        <div className={`${styles.locationsTitleWrapper}`}>
          <h2 className="section-title">{t("title")}</h2>

          <div className={`${styles.locationsText}`}>
            <p
              className={`${styles.locationsTextTitle} section-subtitle`}
              dangerouslySetInnerHTML={{ __html: t.raw("subtitle") }}
            />

            <p
              className={`${styles.locationsTextDescription} ${
                locale === "en" ? styles.locationsTextDescriptionEn : ""
              }`}
              dangerouslySetInnerHTML={{ __html: t("description") }}
            ></p>
          </div>
        </div>

        <div className={`${styles.locationsMapWrapper}`}>
          <LocationsAdaptive locations={locations as any} />

          <div className={`${styles.locationsMap} text-[#DFE2E9]`}>
            <div className={`${styles.locationsMapInner}`}>
              {REGIONS.map(({ name, Component, Line, AdaptiveLine }, inx) => (
                <div key={name} className={`${styles[`${name}Wrapper`]}`}>
                  <Component
                    className={`${
                      styles[name]
                    } transition-all duration-500 ease-in-out ${
                      hoveredCountries[inx] ? "!text-[#FFACA9]" : ""
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
                      citiesListContainer={
                        inx === 6 ? styles.russiaCitiesListContainer : ""
                      }
                      isHovered={hoveredCountries[inx]}
                      onClick={() => onClickHandler(inx)}
                      onMouseEnter={() => onMouseEnterHandler(inx)}
                      onMouseLeave={() => onMouseLeaveHandler(inx)}
                      country={locations[inx].country}
                      countryInx={inx}
                      cities={locations[inx].cities as string[]}
                    >
                      {Line && AdaptiveLine ? (
                        <>
                          {AdaptiveLine !== null && (
                            // @ts-expect-error need a type
                            <Line className={`${styles[`${name}Line`]}`} />
                          )}
                          {Line !== null && AdaptiveLine !== null && (
                            <>
                              <div
                                className={`relative ${styles[`${name}Line`]}`}
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
                            </>
                          )}
                        </>
                      ) : null}
                    </Pointer>
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
  citiesListContainer?: string;
  isHovered?: boolean;
  country: string;
  countryInx: number;
  cities: string[];
}

function Pointer({
  children,
  className,
  lineWrapperClassName,
  lineClassName,
  citiesContainerClassName,
  citiesListContainer,
  isHovered,
  country,
  countryInx,
  cities,
  ...props
}: IPointerProps) {
  const t = useTranslations("CashToCash.Locations");

  return (
    <div
      className={`${styles.pointerWrapper} ${className} ${
        isHovered ? "z-10" : "!z-20"
      }`}
    >
      <div className={`${styles.pointerInner}`}>
        <div
          className={`${lineWrapperClassName} ${
            children && styles.lineImage
          } transition-all duration-500 ease-in-out hidden lg:block ${
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
              <h4 className={`${styles.country}`}>{country}</h4>

              <div className={`${styles.citiesList} ${citiesListContainer}`}>
                {cities &&
                  cities.map((city, inx) => (
                    <div
                      key={inx}
                      className="flex items-center 3xl:gap-[0.42vw] md:gap-2"
                      // dangerouslySetInnerHTML={{ __html: city }}
                    >
                      {
                        // @ts-expect-error: need a type
                        t.rich(`locations.${countryInx}.cities.${inx}`, {
                          flag: (chunks) => (
                            <div className="3xl:size-[0.83vw] xl:size-4 lg:size-4 md:size-4 size-[4.44vw] relative inline-block">
                              <Image
                                src={`/images/cash-to-cash/locations/${chunks}.png`}
                                fill
                                alt=""
                              />
                            </div>
                          ),
                          "hide-lg": (chunks) => (
                            <span className="lg:invisible xl:visible">
                              {chunks}
                            </span>
                          ),
                        })
                      }
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <PointerSvg
          className={`${styles.pointer} ${
            isHovered ? "!text-primary-red" : ""
          }`}
          {...props}
        />
      </div>
    </div>
  );
}
