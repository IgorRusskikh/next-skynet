'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { BREAKPOINTS } from '@/constants';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import styles from './HowToUse.module.css';

type step = {
  title: string;
  description: string;
};

export default function HowToUse() {
  const startAnimRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const titlesRefs = useRef<HTMLSpanElement[]>([]);
  const stepsCountRefs = useRef<HTMLSpanElement[]>([]);
  const stepsDescriptionRefs = useRef<HTMLSpanElement[]>([]);
  const imagesRefs = useRef<HTMLDivElement[]>([]);

  const t = useTranslations('Index.HowToUse');
  const locale = useLocale();

  const mm = gsap.matchMedia();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    pinBannerAnim();
    showTitlesAnim();
    showStepsCountAnim();
    showStepsDescriptionAnim();
    showAndHidePhoneAnim();
    showAndHideTopCallImageAnim();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  const pinBannerAnim = () => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
        isVerticalTablet: `(min-width: ${
          BREAKPOINTS.verticalTablet
        }px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
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

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: parentRef.current,
            start: `top-=${
              isDesktop
                ? '3.5%'
                : isLaptop
                ? '5%'
                : isTablet
                ? '8%'
                : isVerticalTablet
                ? '10%'
                : '4%'
            }`,
            end: `bottom-=${
              isDesktop
                ? 28
                : isLaptop
                ? 32
                : isTablet
                ? 39
                : isVerticalTablet
                ? 38
                : 36
            }%`,
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
        });
      }
    );
  };

  const showTitlesAnim = () => {
    const mm = gsap.matchMedia();

    titlesRefs.current.forEach((title, inx) => {
      mm.add(
        {
          isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
          isVerticalTablet: `(min-width: ${
            BREAKPOINTS.verticalTablet
          }px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
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

          gsap.to(title, {
            keyframes: [
              { opacity: 1, duration: 1 },
              { opacity: 1, duration: 1 },
              {
                opacity:
                  inx === stepsDescriptionRefs.current.length - 1 ? 1 : 0,
                duration: 1,
              },
            ],
            scrollTrigger: {
              trigger: startAnimRef.current,
              start: `top+=${
                (95 / 4.5) * inx +
                5 -
                (isDesktop
                  ? 20
                  : isLaptop
                  ? 20
                  : isTablet
                  ? 15
                  : isVerticalTablet
                  ? 20
                  : 15)
              }%`,
              end: `top+=${
                (95 / 4.5) * (inx + (isVerticalTablet ? -1 : 1)) -
                (isDesktop
                  ? 15
                  : isLaptop
                  ? 20
                  : isTablet
                  ? 10
                  : isVerticalTablet
                  ? -25
                  : 10)
              }%`,
              scrub: true,
            },
          });
        }
      );
    });
  };

  const showStepsCountAnim = () => {
    const tl = gsap.timeline();

    stepsCountRefs.current.forEach((step, inx) => {
      mm.add(
        {
          isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
          isVerticalTablet: `(min-width: ${
            BREAKPOINTS.verticalTablet
          }px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
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

          tl.to(stepsCountRefs.current[inx], {
            keyframes: [
              {
                y: 0,
                duration: 1,
                opacity: isVerticalTablet || isMobile ? 0 : 1,
              },
              {
                y: isMobile
                  ? '-20.67vw'
                  : isVerticalTablet
                  ? -120
                  : isDesktop
                  ? '-11vw'
                  : -168,
                opacity: 1,
                duration: 1,
              },
              {
                y: isMobile
                  ? '-20.67vw'
                  : isVerticalTablet
                  ? -120
                  : isDesktop
                  ? '-11vw'
                  : -168,
                duration: 1,
              },
              {
                y:
                  inx === stepsCountRefs.current.length - 1
                    ? isMobile
                      ? '-20.67vw'
                      : isVerticalTablet
                      ? -120
                      : isDesktop
                      ? '-11vw'
                      : -168
                    : 0,
                opacity:
                  isVerticalTablet ||
                  (isMobile && inx !== stepsCountRefs.current.length - 1)
                    ? 0
                    : 1,
                duration: 1,
              },
            ],
            scrollTrigger: {
              trigger: startAnimRef.current,
              start: `top+=${
                (95 / 4.5) * inx -
                (isDesktop || isLaptop
                  ? 20
                  : isTablet
                  ? 17
                  : isVerticalTablet
                  ? 35
                  : 23)
              }%`,
              end: `top+=${
                (95 / 4.5) * (inx + (isVerticalTablet ? 0 : 1)) -
                (isDesktop
                  ? 10
                  : isLaptop
                  ? 15
                  : isTablet
                  ? 10.5
                  : isVerticalTablet
                  ? -10 * inx
                  : 0)
              }%`,
              scrub: true,
            },
          });
        }
      );
    });
  };

  const showStepsDescriptionAnim = () => {
    const tl = gsap.timeline();
    const mm = gsap.matchMedia();

    stepsDescriptionRefs.current.forEach((step, inx) => {
      mm.add(
        {
          isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
          isVerticalTablet: `(min-width: ${
            BREAKPOINTS.verticalTablet
          }px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
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

          tl.to(step, {
            keyframes: [
              { opacity: 1, duration: 1 },
              { opacity: 1, duration: 1 },
              {
                opacity:
                  inx === stepsDescriptionRefs.current.length - 1 ? 1 : 0,
                duration: 1,
              },
            ],
            scrollTrigger: {
              trigger: startAnimRef.current,
              start: `top+=${
                (95 / 4.5) * inx +
                5 -
                (isVerticalTablet
                  ? 20
                  : isLaptop
                  ? 20
                  : isTablet
                  ? 15
                  : isMobile
                  ? 15
                  : 20)
              }%`,
              end: `top+=${
                (95 / 4.5) * (inx + 1) -
                (isVerticalTablet
                  ? 17
                  : isTablet
                  ? 10
                  : isLaptop
                  ? 20
                  : isMobile
                  ? 10
                  : 15)
              }%`,
              scrub: true,
            },
          });
        }
      );
    });
  };

  const showAndHidePhoneAnim = () => {
    mm.add(
      {
        isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
        isDesktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
        isLaptop: `(min-width: ${BREAKPOINTS.laptop}px) and (max-width: ${
          BREAKPOINTS.desktop - 1
        }px)`,
        isTablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${
          BREAKPOINTS.laptop - 1
        }px)`,
        isVerticalTablet: `(min-width: ${
          BREAKPOINTS.verticalTablet
        }px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
      },
      (context) => {
        const { isDesktop, isLaptop, isTablet, isVerticalTablet, isMobile } =
          context.conditions as any;

        gsap.to(imagesRefs.current[0], {
          keyframes: [
            {
              y: isDesktop
                ? '3vw'
                : isLaptop
                ? 99
                : isTablet
                ? 60
                : isMobile
                ? '45vw'
                : 92,
              duration: 1,
              scale: 1,
            },
            {
              y: isDesktop
                ? '3vw'
                : isLaptop
                ? 99
                : isTablet
                ? 60
                : isMobile
                ? '45vw'
                : 92,
              duration: 1,
            },
            {
              y: isDesktop
                ? '35vw'
                : isLaptop
                ? 450
                : isTablet
                ? 900
                : isMobile
                ? '160vw'
                : 600,
              duration: 1,
            },
          ],
          scrollTrigger: {
            trigger: startAnimRef.current,
            start: `top+=${
              (95 / 4) * 0 +
              4 -
              (isDesktop
                ? 15
                : isLaptop
                ? 20
                : isTablet
                ? 17
                : isVerticalTablet
                ? 36
                : 15)
            }%`,
            end: `top+=${
              (95 / 4) * 1 -
              (isDesktop
                ? 12
                : isLaptop
                ? 17
                : isTablet
                ? 9
                : isVerticalTablet
                ? 20
                : 5)
            }%`,
            scrub: true,
          },
        });

        gsap.to(imagesRefs.current[2], {
          keyframes: [
            {
              y: isDesktop
                ? '3vw'
                : isLaptop
                ? 99
                : isTablet
                ? 58
                : isMobile
                ? '45vw'
                : 100,
              duration: 1,
              scale: 1,
            },
            {
              y: isDesktop
                ? '3vw'
                : isLaptop
                ? 99
                : isTablet
                ? 58
                : isMobile
                ? '45vw'
                : 100,
              duration: 1,
            },
            {
              y: isDesktop
                ? '45vw'
                : isLaptop
                ? 450
                : isTablet
                ? 450
                : isMobile
                ? '160vw'
                : 600,
              duration: 1,
            },
          ],
          scrollTrigger: {
            trigger: startAnimRef.current,
            start: `top+=${
              (95 / 4.5) * 2 +
              4 -
              (isDesktop
                ? 15
                : isLaptop
                ? 16.05
                : isTablet
                ? 17
                : isVerticalTablet
                ? 23
                : 13)
            }%`,
            end: `top+=${
              (95 / 4.5) * 3 -
              (isDesktop ? 11 : isLaptop ? 15.5 : isTablet ? 10 : 5)
            }%`,
            scrub: true,
          },
        });

        gsap.to(imagesRefs.current[3], {
          keyframes: [
            {
              y: isDesktop
                ? '19vw'
                : isLaptop
                ? 270
                : isTablet
                ? 250
                : isMobile
                ? '63vw'
                : 170,
              duration: 1,
              scale: 1,
            },
            {
              y: isDesktop
                ? '19vw'
                : isLaptop
                ? 270
                : isTablet
                ? 250
                : isMobile
                ? '63vw'
                : 170,
              duration: 1,
            },
          ],
          scrollTrigger: {
            trigger: startAnimRef.current,
            start: `top+=${
              (95 / 4.5) * 3 +
              4 -
              (isDesktop ? 15 : isLaptop ? 17 : isTablet ? 15 : 13)
            }%`,
            end: `top+=${
              (95 / 4.5) * 4 - (isDesktop ? 19 : isLaptop ? 19 : 16)
            }%`,
            scrub: true,
          },
        });
      }
    );
  };

  const showAndHideTopCallImageAnim = () => {
    mm.add(
      {
        isDesktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
        isLaptop: `(min-width: ${BREAKPOINTS.laptop}px) and (max-width: ${
          BREAKPOINTS.desktop - 1
        }px)`,
        isTablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${
          BREAKPOINTS.laptop - 1
        }px)`,
        isVerticalTablet: `(min-width: ${
          BREAKPOINTS.verticalTablet
        }px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
        isMobile: `(max-width: ${BREAKPOINTS.verticalTablet - 1}px)`,
      },
      (context) => {
        const { isDesktop, isLaptop, isTablet, isVerticalTablet, isMobile } =
          context.conditions as any;

        gsap.to(imagesRefs.current[1], {
          keyframes: [
            {
              y: isDesktop
                ? '17vw'
                : isLaptop
                ? 230
                : isTablet
                ? 200
                : isMobile
                ? '80vw'
                : 280,
              duration: 1,
            },
            {
              y: isDesktop
                ? '17vw'
                : isLaptop
                ? 230
                : isTablet
                ? 200
                : isMobile
                ? '80vw'
                : 280,
              duration: 1,
              opacity: 0.9,
            },
            { y: '-17vw', duration: 1, opacity: 0 },
          ],
          scrollTrigger: {
            trigger: startAnimRef.current,
            start: `top+=${
              (95 / 4.5) * 1 +
              4 -
              (isDesktop ? 20 : isLaptop || isTablet ? 20 : isMobile ? 13 : 30)
            }%`,
            end: `top+=${(95 / 4.5) * 2 - (isLaptop ? 10 : isMobile ? 0 : 0)}%`,
            scrub: true,
          },
        });
      }
    );
  };

  const bannerTitles = useMemo(
    () =>
      // @ts-expect-error: need an interface
      (Object.values(t.raw('steps')) as step[]).map((step) => step.title),
    []
  );
  const bannerStepDescription = useMemo(
    () =>
      // @ts-expect-error: need an interface
      (Object.values(t.raw('steps')) as step[]).map((step) => step.description),
    []
  );

  return (
    <section id='how-to-use' className={`${styles.howToUse}`}>
      <div className={`${styles.howToUseInner}`}>
        <div
          className={`${styles.sectionHeader} ${
            locale === 'en' ? styles.sectionHeaderEn : ''
          }`}
        >
          <h3 className={`${styles.howToUseTitle} section-title`}>
            {t('title')}
          </h3>

          <p
            className={`${styles.howToUseDescription} ${
              locale === 'en' ? styles.howToUseDescriptionEn : ''
            }`}
          >
            {t.rich('subtitle', {
              'hidden-text': (chunks) => (
                <span className='!hidden md:!inline'>{chunks}</span>
              ),
              span: (chunks) => (
                <span className='text-black inline'>{chunks}</span>
              ),
            })}
          </p>

          <p className={`${styles.howToUseDescriptionText} md:!hidden`}>
            {t('mobile-subtitle')}
          </p>
        </div>

        <div ref={startAnimRef} className='h-fit overflow-clip'>
          <div className={`${styles.howToUseContent}`} ref={parentRef}>
            <div className={`${styles.banner}`}>
              <div
                className={`${styles.topCallImageWrapper}`}
                ref={(node) => {
                  imagesRefs.current[1] = node!;
                }}
              >
                <div className={`${styles.topCallImage}`}>
                  <Image
                    src={'/images/main-page-how-to-use/call.png'}
                    fill
                    alt='call'
                  />
                </div>
              </div>

              <p className={`${styles.bannerTitle}`}>
                {bannerTitles.map((title, index) => (
                  <span
                    key={index}
                    ref={(node) => {
                      titlesRefs.current[index] = node!;
                    }}
                    dangerouslySetInnerHTML={{ __html: title }}
                  ></span>
                ))}
              </p>

              <div
                className={`${styles.bannerStep} ${
                  locale === 'en' ? styles.bannerStepEn : ''
                }`}
              >
                <p className={`${styles.bannerStepNumber}`}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span
                      key={index}
                      ref={(node) => {
                        stepsCountRefs.current[index] = node!;
                      }}
                    >
                      0{index + 1}
                    </span>
                  ))}
                </p>

                <p
                  className={`${styles.bannerStepDescription} ${
                    locale === 'en' ? styles.bannerStepDescriptionEn : ''
                  }`}
                >
                  <span
                    className={`!relative invisible opacity-0`}
                    dangerouslySetInnerHTML={{
                      __html:
                        t.raw('steps.0.description') +
                        '_______________________',
                    }}
                  ></span>

                  {bannerStepDescription.map((description, index) => (
                    <span
                      key={index}
                      ref={(node) => {
                        stepsDescriptionRefs.current[index] = node!;
                      }}
                      dangerouslySetInnerHTML={{ __html: description }}
                    ></span>
                  ))}
                </p>
              </div>

              <div
                className={`${styles.bottomPhoneImageWrapper}`}
                ref={(node) => {
                  imagesRefs.current[0] = node!;
                }}
              >
                <div className={`${styles.bottomPhoneImage}`}>
                  <Image
                    src={'/images/main-page-how-to-use/phone.png'}
                    fill
                    alt='phone'
                    className='hidden lg:block'
                    unoptimized
                  />
                  <Image
                    src={'/images/main-page-how-to-use/phone-md.png'}
                    fill
                    alt='phone'
                    className='hidden md:block lg:hidden'
                  />
                  <Image
                    src={'/images/main-page-how-to-use/phone-xs.png'}
                    fill
                    alt='phone'
                    className='block md:hidden'
                  />
                </div>
              </div>

              <div
                className={`${styles.bottomPhoneImageWrapper}`}
                ref={(node) => {
                  imagesRefs.current[2] = node!;
                }}
              >
                <div className={`${styles.bottomPhoneImage}`}>
                  <Image
                    src={'/images/main-page-how-to-use/phone-success.png'}
                    fill
                    alt='phone'
                    className='hidden lg:block'
                    unoptimized
                  />
                  <Image
                    src={'/images/main-page-how-to-use/phone-success-md.png'}
                    fill
                    alt='phone'
                    className='hidden md:block lg:hidden'
                  />
                  <Image
                    src={'/images/main-page-how-to-use/phone-success-xs.png'}
                    fill
                    alt='phone'
                    className='block md:hidden'
                  />
                </div>
              </div>

              <div
                className={`${styles.bottomTransactionImageWrapper}`}
                ref={(node) => {
                  imagesRefs.current[3] = node!;
                }}
              >
                <div className={`${styles.bottomTransactionImage}`}>
                  <Image
                    src={'/images/main-page-how-to-use/transaction-success.png'}
                    fill
                    alt='transaction'
                    className='hidden lg:block'
                    unoptimized
                  />
                  <Image
                    src={
                      '/images/main-page-how-to-use/transaction-success-md.png'
                    }
                    fill
                    alt='transaction'
                    className='block lg:hidden'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
