"use client";

import { useEffect, useRef, useState } from "react";

import Plus from "@/svg/plus.svg";
import gsap from "gsap";
import styles from "./LocationsAdaptive.module.css";

interface Props {
  locations: [{ country: string; cities: string[] }];
}

interface ICities {
  citiesListRef: HTMLDivElement | null;
  isOpen: boolean;
}

const CLASSNAMES = [
  "northAmerica",
  "latinAmerica",
  "africa",
  "east",
  "asia",
  "europa",
  "russia",
  "australia",
] as const;

export default function LocationsAdaptive({ locations }: Props) {
  const [cities, setCities] = useState<ICities[]>(
    Array.from({ length: locations.length }).map(() => ({
      citiesListRef: null,
      isOpen: false,
    }))
  );

  const toggleCitiesList = (blockRef: HTMLDivElement) => {
    const currentHeight = blockRef.style.maxHeight || "0px";
    gsap.set(blockRef, {
      maxHeight: `${currentHeight === "0px" ? blockRef.scrollHeight : 0}px`,
      marginTop: `${currentHeight === "0px" ? 24 : 0}px`,
    });
  };

  return (
    <div className={`${styles.listWrapper}`}>
      <div className={`${styles.countriesList}`}>
        {locations.map((location, inx) => (
          <div
            key={inx}
            className={`${styles.countriesItem}`}
            onClick={() => {
              toggleCitiesList(cities[inx].citiesListRef!);
              setCities(
                cities.map((city, cityInx) => {
                  if (inx === cityInx) {
                    return { ...city, isOpen: !city.isOpen };
                  }
                  return city;
                })
              );
            }}
          >
            <div className={`${styles.country}`}>
              <h4>{location.country}</h4>

              <Plus
                className={`${cities[inx].isOpen ? "rotate-45" : "rotate-0"}`}
              />
            </div>

            <div
              ref={(node) => {
                cities[inx].citiesListRef = node!;
              }}
              className="transition-all duration-500 overflow-clip max-h-0"
            >
              <div
                className={`${styles.citiesList} ${styles[`${CLASSNAMES[inx]}CitiesList`]}`}
              >
                {location.cities.map((city, inx) => (
                  <p key={inx}>{city}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
