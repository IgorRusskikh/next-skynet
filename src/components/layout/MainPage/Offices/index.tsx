"use client";

import { HTMLAttributes, useEffect, useMemo, useRef } from "react";

import { BREAKPOINTS } from "@/constants";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "./Offices.module.css";
import { useTranslations } from "next-intl";

interface Props extends HTMLAttributes<HTMLElement> {}

type office = {
  country: string;
  address: string;
};

export default function Offices({ className }: Props): JSX.Element {
  const officesBlockRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("Index.Offices");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
        isVerticalTablet: `(min-width: ${
          BREAKPOINTS.verticalTablet
        }px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`,
        isDesktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
      },
      (context) => {
        const { isMobile, isVerticalTablet, isDesktop } =
          context.conditions as any;

        gsap.to(officesBlockRef.current, {
          x: isVerticalTablet ? -300 : isMobile ? "-130vw" : -200,
          scrollTrigger: {
            trigger: officesBlockRef.current,
            start: `top-=${isMobile ? 350 : isVerticalTablet ? 400 : isMobile ? 500 : 200}%`,
            end: `bottom+=${isDesktop ? 600 : isMobile ? 50 : 30}%`,
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

  const countries = useMemo(
    () =>
      Object.values(
        t.raw(
          // @ts-expect-error: need an interface
          "offices-list"
        )
      ) as office[],
    []
  );

  return (
    <section id="offices" className={`${styles.offices} ${className}`}>
      <div className={`${styles.officesInner}`}>
        <div className={`${styles.officesTitleWrapper}`}>
          <h2 className={`${styles.officesTitle} section-title`}>
            {t("title")}
          </h2>

          <div className={`${styles.officesText}`}>
            <p
              className={`${styles.officesTextTitle} section-subtitle`}
              dangerouslySetInnerHTML={{ __html: t.raw("subtitle") }}
            />

            <p
              className={`${styles.officesTextDescription}`}
              dangerouslySetInnerHTML={{ __html: t.raw("description") }}
            ></p>
          </div>
        </div>

        <div className={`${styles.officesContent}`}>
          <div className={`${styles.officesList}`}>
            <div
              className={`${styles.officesListWrapper}`}
              ref={officesBlockRef}
            >
              {countries.map(({ country, address }, inx) => (
                <OfficeCard
                  key={inx}
                  image={images[inx]}
                  location={country}
                  address={address}
                  index={inx}
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

interface IOfficeCard extends HTMLAttributes<HTMLDivElement> {
  image: string;
  location: string;
  address: string;
  index: number;
}

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
      className={`${styles.officesListItem} ${className} group`}
      style={{ backgroundImage: `url('/images/offices/${image}')` }}
      {...props}
    >
      <div className={`${styles.location}`}>
        <span className={`${styles.locationFlag}`}>{flags[index]}</span>
        {location}
      </div>

      <div className={`${styles.address} group-hover:opacity-100 group-hover:visible`}>
        <p>{address}</p>
      </div>
    </div>
  );
}
