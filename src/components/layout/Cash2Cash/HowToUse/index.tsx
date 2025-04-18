'use client';

import { NamespaceKeys, useLocale, useTranslations } from 'use-intl';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';

import { BREAKPOINTS } from '@/constants';
import HowToUseSlider from '@/components/HowToUseSlider';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import styles from './HowToUse.module.css';

interface Props {
  tNamespace?: string;
}

export default function HowToUse({ tNamespace }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const startAnimationRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const infoBlockRef = useRef(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);
  const titleRefs = useRef<HTMLSpanElement[]>([]);
  const descriptionRefs = useRef<HTMLSpanElement[]>([]);
  // PHONES REFS
  const leftPhoneRef = useRef<HTMLDivElement>(null);
  const rightPhoneRef = useRef<HTMLDivElement>(null);

  const t = useTranslations(
    `${tNamespace}.HowToUse` as NamespaceKeys<IntlMessages, 'CashToCash'>
  );
  const locale = useLocale();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    pinAnim();

    fadeAnim(counterRefs);
    fadeAnim(titleRefs);
    fadeAnim(descriptionRefs);

    movePhonesAnim();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    adaptiveMovePhonesAnim(currentSlide);
  }, [currentSlide]);

  const pinAnim = () => {
    const mm = gsap.matchMedia();
    mm.revert();

    mm.add(
      {
        isVerticalTablet: `(min-width: ${
          BREAKPOINTS.verticalTablet
        }px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
        isTablet: `(min-width: ${BREAKPOINTS.tablet}px)`,
      },
      (context) => {
        const { isVerticalTablet, isTablet } = context.conditions as any;

        const animation = gsap.to(startAnimationRef.current, {
          scrollTrigger: {
            trigger: parentRef.current,
            start: `top ${isTablet ? 'top' : '+=174px'}`,
            end: `bottom bottom`,
            pin: true,
            scrub: true,
            pinSpacing: false,
          },
        });

        return () => {
          animation.scrollTrigger?.kill();
        };
      }
    );
  };

  const movePhonesAnim = () => {
    const mm = gsap.matchMedia();
    mm.revert();

    mm.add(
      {
        isVerticalTablet: `(min-width: ${
          BREAKPOINTS.verticalTablet
        }px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
        isTablet: `(min-width: ${BREAKPOINTS.tablet - 1}px) and (max-width: ${
          BREAKPOINTS.laptop - 1
        }px)`,
        isLaptop: `(min-width: ${BREAKPOINTS.laptop}px)`,
      },
      (context) => {
        const { isLaptop, isTablet } = context.conditions as any;

        const leftPhoneAnim = gsap.to(leftPhoneRef.current, {
          y: isLaptop ? -300 : isTablet ? -140 : -300,
          scrollTrigger: {
            trigger: startAnimationRef.current,
            start: `top ${isTablet ? 'top' : '+=174px'}`,
            end: `bottom+=${isTablet ? 70 : 100}%`,
            scrub: true,
          },
        });

        const rightPhoneAnim = gsap.to(rightPhoneRef.current, {
          y: isLaptop ? 300 : isTablet ? 190 : 320,
          scrollTrigger: {
            trigger: startAnimationRef.current,
            start: `top ${isTablet ? 'top' : '+=174px'}`,
            end: `bottom+=${isTablet ? 70 : 100}%`,
            scrub: true,
          },
        });

        return () => {
          leftPhoneAnim.scrollTrigger?.kill();
          rightPhoneAnim.scrollTrigger?.kill();
        };
      }
    );
  };

  const adaptiveMovePhonesAnim = (inx: number) => {
    const mm = gsap.matchMedia();
    mm.revert();

    mm.add(
      `(min-width: 0px) and (max-width: ${BREAKPOINTS.verticalTablet}px)`,
      () => {
        const leftPhoneAnim = gsap.to(leftPhoneRef.current, {
          y: (inx * -6) / 3 + '%',
          duration: 0.5,
          ease: 'power.inOut',
        });

        const rightPhoneAnim = gsap.to(rightPhoneRef.current, {
          y: (inx * 28) / 3 + '%',
          duration: 0.5,
          ease: 'power.inOut',
        });

        return () => {
          leftPhoneAnim.kill();
          rightPhoneAnim.kill();
        };
      }
    );
  };

  const fadeAnim = (refsList: RefObject<HTMLElement[]>) => {
    const mm = gsap.matchMedia();

    mm.add(`(min-width: 0px)`, () => {
      const tl = gsap.timeline();

      if (refsList.current && refsList.current.length !== 0) {
        refsList.current.forEach((ref, inx) => {
          const startPercent = (inx * 70) / 4 - 10;
          const endPercent = ((inx + 0.7) * 70) / 4 + 5;

          tl.to(ref, {
            keyframes: [
              { opacity: inx === 0 ? 1 : 0 },
              { opacity: 1 },
              { opacity: inx === 3 ? 1 : 0 },
            ],
            scrollTrigger: {
              trigger: startAnimationRef.current,
              start: `top+=${startPercent}%`,
              end: `top+=${endPercent}%`,
              scrub: true,
            },
          });
        });
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
  };

  const stepsTitles = useMemo(
    // @ts-expect-error: need a type
    () => Object.values(t.raw('steps')).map(({ title }) => title),
    []
  );

  const stepsDescriptions = useMemo(
    // @ts-expect-error: need a type
    () => Object.values(t.raw('steps')).map(({ description }) => description),
    []
  );

  return (
    <section id='how-to-use' className={`${styles.howToUse}`}>
      <div className={styles.howToUseContainer}>
        <div className={styles.howToUseTitleWrapper}>
          <h2 className={`section-title`}>
            {
              // @ts-expect-error: need a type
              t('title')
            }
          </h2>

          <div className={styles.howToUseContentText}>
            <h3
              className={`${styles.howToUseContentTitle} section-subtitle ${
                locale === 'en' ? styles.howToUseContentTitleEn : ''
              }`}
              dangerouslySetInnerHTML={{
                // @ts-expect-error: need a type
                __html: t.raw('subtitle'),
              }}
            />
          </div>
        </div>

        <div ref={startAnimationRef}>
          <div ref={parentRef} className={`${styles.contentWrapper}`}>
            <div className={styles.howToUseContent}>
              <HowToUseSlider
                setCurrentSlide={setCurrentSlide}
                tNamespace={tNamespace}
              />

              <div ref={infoBlockRef} className={`${styles.infoContainer}`}>
                <div className={`${styles.stepNumber}`}>
                  <div className={`${styles.stepNumberWrapper}`}>
                    <p className={`${styles.numberMask}`}>04</p>

                    {Array.from({ length: 4 }).map((_, inx) => (
                      <span
                        key={inx}
                        ref={(node) => {
                          if (node) {
                            counterRefs.current.push(node);
                          }
                        }}
                        className={`${styles.stepCount} ${
                          inx === 0 ? '' : 'opacity-0'
                        }`}
                      >
                        0{inx + 1}
                      </span>
                    ))}
                  </div>
                  <span
                    className={`${styles.servicesCardCountSeparator} text-[#898C98]`}
                  >
                    —
                  </span>
                  <span className='text-[#898C98]'>04</span>
                </div>

                <div className={`${styles.descriptionContainer}`}>
                  <p className={`${styles.stepTitlCntainer}`}>
                    <span
                      className='!opacity-0'
                      dangerouslySetInnerHTML={{
                        // @ts-expect-error: need a type
                        __html: t(`steps.${currentSlide}.title`),
                      }}
                    />

                    {stepsTitles.map((title, inx) => (
                      <span
                        key={inx}
                        ref={(node) => {
                          if (node) {
                            titleRefs.current.push(node);
                          }
                        }}
                        className={`${styles.stepTitle} ${
                          inx === 0 ? '' : 'opacity-0'
                        }`}
                        dangerouslySetInnerHTML={{ __html: title as string }}
                      />
                    ))}
                  </p>

                  <p className={`${styles.stepDescriptionContainer}`}>
                    <span
                      className='!opacity-0'
                      dangerouslySetInnerHTML={{
                        __html: stepsDescriptions[0] as string,
                      }}
                    />

                    {stepsDescriptions.map((desc, inx) => (
                      <span
                        key={inx}
                        ref={(node) => {
                          if (node) {
                            descriptionRefs.current.push(node);
                          }
                        }}
                        className={`${styles.stepDescriptionText} ${
                          inx === 0 ? '' : 'opacity-0'
                        }`}
                        dangerouslySetInnerHTML={{ __html: desc as string }}
                      />
                    ))}
                  </p>
                </div>
              </div>

              <div className={`${styles.phonesContainerWrapper}`}>
                <div className={`${styles.phonesContainer}`}>
                  {/* LEFT IPHONE */}
                  <div
                    ref={leftPhoneRef}
                    className={`${styles.leftIphoneWrapper}`}
                  >
                    <div className={`${styles.leftIphone}`}>
                      <Image
                        src={`/images/${
                          locale === 'en'
                            ? 'cash-to-cash/left-phone-en.png'
                            : 'cash-to-cash/left-phone.png'
                        }`}
                        fill
                        alt='left-phone'
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* RIGHT IPHONE */}
                  <div
                    ref={rightPhoneRef}
                    className={`${styles.rightIphoneWrapper}`}
                  >
                    <div className={`${styles.rightIphone}`}>
                      <Image
                        src={`/images/${
                          tNamespace === 'VED'
                            ? 'fta/how-to-use'
                            : 'cash-to-cash'
                        }/${
                          locale === 'en' ? 'right-phone-en' : 'right-phone'
                        }.png`}
                        fill
                        alt='right-phone'
                        quality={50}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.hidingBlocks}`}>
                <div className={`${styles.hidingBlocksWrapper}`}>
                  <div className={`${styles.bigCircle}`}></div>
                  <div className={`${styles.smallCircle}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
