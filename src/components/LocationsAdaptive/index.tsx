"use client";

import { useEffect, useRef, useState } from "react";

import Plus from "@/svg/plus.svg";
import gsap from "gsap";
import styles from "./LocationsAdaptive.module.css";

interface ICities {
  citiesListRef: HTMLDivElement | null;
  isOpen: boolean;
}

export default function LocationsAdaptive() {
  const [cities, setCities] = useState<ICities[]>(
    Array.from({ length: 7 }).map(() => ({
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
        {Array.from({ length: 7 }).map((_, inx) => (
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
              <h4>Россия</h4>

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
                className={`${styles.citiesList} ${styles.russiaCitiesList}`}
              >
                {Array.from({ length: 20 }).map((_, inx) => (
                  <p key={inx}>Москва</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
