'use client';

import 'swiper/css';

import { HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useLocale, useTranslations } from 'next-intl';

import { BREAKPOINTS } from '@/constants';
import { FaArrowRightLong } from 'react-icons/fa6';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper as SwiperType } from 'swiper';
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
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

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

  const swiperOptions = {
    breakpoints: {
      320: {
        slidesPerView: 1.6,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2.3,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 2.6,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 2.6,
        spaceBetween: 20,
      },
      1535: {
        slidesPerView: 2.7,
        spaceBetween: '1vw',
      },
      1800: {
        slidesPerView: 3.3,
        spaceBetween: '1vw',
      },
      1920: {
        slidesPerView: 3.3,
        spaceBetween: '1vw',
      },
    },
    onSwiper: (swiper: SwiperType) => {
      setSwiper(swiper);
    },
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
            <Swiper {...swiperOptions}>
              {images.map((imagesArray, inx) => (
                <SwiperSlide key={inx}>
                  <OfficeCard
                    images={imagesArray}
                    location={countries[inx]?.country || ''}
                    address={countries[inx]?.address || ''}
                    index={inx}
                    flag={
                      // @ts-expect-error: need a type
                      t(`offices-list.${inx}.flag`)
                    }
                    onCopy={() =>
                      handleCopyAddress(
                        countries[inx]?.address || '',
                        countries[inx]?.country || ''
                      )
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={`${styles.sliderControls}`}>
            <SliderControl
              direction='prev'
              onClick={() => swiper?.slidePrev()}
            />
            <SliderControl
              direction='next'
              onClick={() => swiper?.slideNext()}
            />
          </div>
        </div>
      </div>

      {copiedMessage && (
        <div className={`${styles.notification}`}>{copiedMessage}</div>
      )}
    </section>
  );
}

const images = [
  ['moscow-1.jpg', 'moscow-2.jpg', 'moscow-3.jpg'],
  ['dubai-1.png', 'dubai-2.png', 'dubai-3.png'],
  ['ufa-1.jpg', 'ufa-2.jpg', 'ufa-3.png'],
  ['miami-1.jpg', 'miami-2.jpg', 'miami-3.jpg'],
];

interface IOfficeCard extends HTMLAttributes<HTMLDivElement> {
  images: string[];
  location: string;
  address: string;
  index: number;
  flag: string;
  onCopy?: () => void;
}

function OfficeCard({
  images,
  location,
  address,
  className,
  index,
  flag,
  onCopy,
  ...props
}: IOfficeCard) {
  const [currentImage, setCurrentImage] = useState<string | null>(
    images[0] || null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const currentIndex = images.indexOf(prev as string);
        return currentIndex === images.length - 1
          ? images[0]
          : images[currentIndex + 1];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${styles.officesListItem} ${className} group cursor-pointer overflow-clip relative`}
      onClick={onCopy}
      {...props}
    >
      <div className={`${styles.officesImages} absolute inset-0`}>
        {images.map((image, inx) => (
          <Image
            key={inx}
            src={`/images/offices/${image}`}
            alt=''
            fill
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              currentImage === image ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

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
        className={`${styles.address} group-hover:xl:opacity-100 group-hover:xl:visible relative z-10`}
      >
        <p>{address}</p>
      </div>
    </div>
  );
}

interface ISliderControl extends HTMLAttributes<HTMLDivElement> {
  direction: 'prev' | 'next';
  onClick: () => void;
}

function SliderControl({
  direction,
  onClick,
  className,
  ...props
}: ISliderControl) {
  return (
    <div className={`${styles.sliderControl} ${className}`} {...props}>
      <button className={`${styles.sliderControlButton}`} onClick={onClick}>
        <FaArrowRightLong
          className={`${styles.sliderControlIcon} ${
            direction === 'prev' ? 'rotate-180' : ''
          }`}
        />
      </button>
    </div>
  );
}
