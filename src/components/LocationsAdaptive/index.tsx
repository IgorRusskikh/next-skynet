"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Plus from "@/svg/plus.svg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "./LocationsAdaptive.module.css";
import { useTranslations } from "next-intl";

interface Props {
  locations: { country: string; cities: string[] }[];
}

interface ICities {
  citiesListRef: HTMLDivElement | null;
  isOpen: boolean;
}

const CLASSNAMES = [
  "russia",
  "europa",
  "east",
  "asia",
  "northAmerica",
  "latinAmerica",
  "africa",
  "australia",
] as const;

export default function LocationsAdaptive({ locations }: Props) {
  const [cities, setCities] = useState<ICities[]>(
    Array.from({ length: locations.length }).map(() => ({
      citiesListRef: null,
      isOpen: false,
    }))
  );

  const t = useTranslations("CashToCash.Locations");

  const toggleCitiesList = (blockRef: HTMLDivElement, index: number) => {
    const currentHeight = blockRef.style.maxHeight || "0px";

    gsap.set(blockRef, {
      maxHeight: `${currentHeight === "0px" ? blockRef.scrollHeight : 0}px`,
      marginTop: `${currentHeight === "0px" ? 24 : 0}px`,
    });

    setCities(
      cities.map((city, cityInx) => ({
        ...city,
        isOpen: cityInx === index ? !city.isOpen : false,
      }))
    );

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  };

  const formattedLocations = {
    0: { location: locations[6], index: 6 },
    1: { location: locations[5], index: 5 },
    2: { location: locations[3], index: 3 },
    3: { location: locations[4], index: 4 },
    4: { location: locations[0], index: 0 },
    5: { location: locations[1], index: 1 },
    6: { location: locations[2], index: 2 },
  };

  return (
    <div className={`${styles.listWrapper}`}>
      <div className={`${styles.countriesList}`}>
        {Object.values(formattedLocations).map(({ location, index }, inx) => (
          <div
            key={inx}
            className={`${styles.countriesItem}`}
            onClick={() => {
              toggleCitiesList(cities[inx].citiesListRef!, inx);
            }}
          >
            <div className={`${styles.country}`}>
              <h4>{location.country}</h4>

              <Plus
                className={`${
                  cities[inx].isOpen
                    ? "rotate-45 fill-black"
                    : "rotate-0 fill-[#898C98]"
                }`}
              />
            </div>

            <div
              ref={(node) => {
                cities[inx].citiesListRef = node!;
              }}
              className="transition-all duration-500 overflow-clip max-h-0"
            >
              <div
                className={`${styles.citiesList} ${
                  styles[`${CLASSNAMES[inx]}CitiesList`]
                }`}
              >
                {location.cities.map((city, cityInx) => (
                  <div
                    key={cityInx}
                    className="w-fit flex items-center md:gap-2 gap-[2.22vw]"
                  >
                    {
                      // @ts-expect-error: need a type
                      t.rich(`locations.${index}.cities.${cityInx}`, {
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
        ))}
      </div>
    </div>
  );
}
