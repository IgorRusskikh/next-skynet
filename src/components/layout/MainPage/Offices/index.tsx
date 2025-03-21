'use client';

import { HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { BREAKPOINTS } from '@/constants';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import styles from './Offices.module.css';

interface Props extends HTMLAttributes<HTMLElement> {}

type office = {
  country: string;
  address: string;
};

export default function Offices({ className }: Props): JSX.Element {
  const officesBlockRef = useRef<HTMLDivElement>(null);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

  const t = useTranslations('Index.Offices');
  const locale = useLocale();

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
          x: isVerticalTablet ? -300 : isMobile ? '-130vw' : -200,
          scrollTrigger: {
            trigger: officesBlockRef.current,
            start: `top-=${
              isMobile ? 350 : isVerticalTablet ? 400 : isMobile ? 500 : 200
            }%`,
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
          'offices-list'
        )
      ) as office[],
    []
  );

  const handleCopyAddress = (address: string, location: string) => {
    if (!address) return;

    navigator.clipboard
      .writeText(address)
      .then(() => {
        setCopiedMessage(`${location}: ${t('address-copied')}`);
        setTimeout(() => setCopiedMessage(null), 3000);
      })
      .catch((err) => {
        console.error('Ошибка при копировании адреса:', err);
      });
  };

  return (
    <section id='offices' className={`${styles.offices} ${className}`}>
      <div className={`${styles.officesInner}`}>
        <div className={`${styles.officesTitleWrapper}`}>
          <h2 className={`${styles.officesTitle} section-title`}>
            {t('title')}
          </h2>

          <div className={`${styles.officesText}`}>
            <p
              className={`${styles.officesTextTitle} section-subtitle`}
              dangerouslySetInnerHTML={{ __html: t.raw('subtitle') }}
            />

            <p
              className={`${styles.officesTextDescription} ${
                locale === 'en' ? styles.officesTextDescriptionEn : ''
              }`}
              dangerouslySetInnerHTML={{ __html: t.raw('description') }}
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
                  flag={
                    // @ts-expect-error: need a type
                    t(`offices-list.${inx}.flag`)
                  }
                  onCopy={() => handleCopyAddress(address, country)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {copiedMessage && (
        <div className={`${styles.notification}`}>{copiedMessage}</div>
      )}
    </section>
  );
}

const images = ['moscow.png', 'dubai.png', 'ufa.png', 'usa.png'];

interface IOfficeCard extends HTMLAttributes<HTMLDivElement> {
  image: string;
  location: string;
  address: string;
  index: number;
  flag: string;
  onCopy?: () => void;
}

function OfficeCard({
  image,
  location,
  address,
  className,
  index,
  flag,
  onCopy,
  ...props
}: IOfficeCard) {
  return (
    <div
      className={`${styles.officesListItem} ${className} group cursor-pointer`}
      style={{ backgroundImage: `url('/images/offices/${image}')` }}
      onClick={onCopy}
      {...props}
    >
      <div className={`${styles.location}`}>
        <div className='3xl:size-[0.83vw] xl:size-4 lg:size-4 md:size-4 size-[4.44vw] relative inline-block'>
          <Image
            src={`/images/cash-to-cash/locations/${flag}.png`}
            fill
            alt=''
          />
        </div>
        {location}
      </div>

      <div
        className={`${styles.address} group-hover:opacity-100 group-hover:visible`}
      >
        <p>{address}</p>
      </div>
    </div>
  );
}
