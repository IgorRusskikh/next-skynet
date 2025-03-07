'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import CustomLink from '@/components/ui/Link';
import { INNER_SITES } from '@/constants';
import Image from 'next/image';
import ServicesSlider from '@/components/ServicesSlider';
import styles from './Services.module.css';

export type service = {
  title: string;
  description: string;
  link: string;
};

export default function Services() {
  const [currentService, setCurrentService] = useState(0);

  const t = useTranslations('Index.Services');
  const locale = useLocale();

  const services = useMemo(
    // @ts-expect-error: need an interface
    () => Object.values(t.raw('services')) as service[],
    []
  );

  const servicesImage = [
    '/images/main-page-services/first-service-image-xs.png',
    '/images/main-page-services/second-service-image-xs.png',
    '/images/main-page-services/third-service-image-xs.png',
  ];

  return (
    <section id='services' className={`${styles.services}`}>
      <div className={`${styles.servicesContainer}`}>
        <div className={`${styles.servicesTitleWrapper}`}>
          <h3 className={`${styles.servicesTitle} section-title`}>
            {t('title')}
          </h3>

          <div
            className={`${styles.servicesContentText} hidden md:block lg:hidden`}
          >
            <h3
              className={`${styles.servicesContentTitle} section-subtitle`}
              dangerouslySetInnerHTML={{ __html: t.raw('subtitle') }}
            />
            <p className={`${styles.servicesContentDescription}`}>
              {t('description')}
            </p>
          </div>
        </div>

        <div className={`${styles.servicesContent}`}>
          <div className={`${styles.servicesContentText} md:hidden lg:block`}>
            <h2
              className={`${styles.servicesContentTitle} section-subtitle`}
              dangerouslySetInnerHTML={{ __html: t.raw('subtitle') }}
            />
            <p className={`${styles.servicesContentDescription}`}>
              {t('description')}
            </p>
          </div>

          <div className={`${styles.servicesList}`}>
            {/* FOR SCREEN >= 1024PX */}
            <>
              <div className={`${styles.servicesListItems} !hidden lg:!block`}>
                <ul>
                  {services.map(({ title }, inx) => (
                    <li
                      key={title}
                      className={`${styles.servicesListItem} ${
                        currentService === inx ? 'text-black' : ''
                      } !cursor-pointer`}
                    >
                      <button
                        className=''
                        onClick={() => setCurrentService(inx)}
                      >
                        {title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${styles.servicesCard} !hidden lg:!flex`}>
                <div className={`${styles.servicesCardCount}`}>
                  <span className='w-[20px]'>{`0${currentService + 1}`} </span>
                  <span className={`${styles.servicesCardCountSeparator}`}>
                    —
                  </span>{' '}
                  <span className='text-[#898C98]'>{`0${services.length}`}</span>
                </div>

                <div className={`${styles.servicesCardContent}`}>
                  <p className={`${styles.servicesCardDescription}`}>
                    <span
                      className='opacity-0 !relative'
                      dangerouslySetInnerHTML={{
                        __html: services[0].description,
                      }}
                    />
                    {services.map(({ description }, inx) => (
                      <span
                        key={inx}
                        className={`${
                          currentService === inx
                            ? 'opacity-100 visible'
                            : 'opacity-0 invisible'
                        }`}
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    ))}
                  </p>

                  <p className={`${styles.servicesCardLink}`}>
                    <span className='opacity-0'>{services[0].link}</span>
                    {services.map(({ link }, inx) => (
                      <CustomLink
                        key={inx}
                        href={`/${locale}/${
                          Object.values(INNER_SITES).slice(1)[inx].link
                        }`}
                        className={`${
                          currentService === inx
                            ? 'opacity-100 visible'
                            : 'opacity-0 invisible'
                        }`}
                      >
                        <span className={``}>{link}</span>
                      </CustomLink>
                    ))}
                  </p>
                </div>
              </div>
            </>

            {/* FOR SCREEN < 1024PX */}
            <div
              className={`${styles.servicesCard} !hidden md:!flex lg:!hidden`}
            >
              <div className={`${styles.servicesCardHeader}`}>
                {services.map(({ title }, inx) => (
                  <button
                    key={inx}
                    onClick={() => setCurrentService(inx)}
                    className={`${styles.servicesCardHeaderButton} ${
                      currentService === inx ? '!text-black' : ''
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>

              <div className={`${styles.servicesCardDescriptionContainer}`}>
                <p className={`${styles.servicesCardCount}`}>
                  0{currentService + 1}
                  <span className={`${styles.servicesCardCountSeparator}`}>
                    -
                  </span>
                  <span className='text-[#898C98]'>{`0${services.length}`}</span>
                </p>

                <div className={`${styles.serviceDescription}`}>
                  <p className={`${styles.servicesCardDescription}`}>
                    <span className='opacity-0 !relative'>
                      {services[0].description}
                    </span>
                    {services.map(({ description }, inx) => (
                      <span
                        key={inx}
                        className={`${
                          currentService === inx
                            ? 'opacity-100 visible'
                            : 'opacity-0 invisible'
                        }`}
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    ))}
                  </p>

                  <p className={`${styles.servicesCardLink}`}>
                    <span className='opacity-0'>{services[0].link}</span>
                    {services.map(({ link }, inx) => (
                      <CustomLink
                        key={inx}
                        href={`/${locale}/${
                          Object.values(INNER_SITES)[inx].link
                        }`}
                        className={`${
                          currentService === inx
                            ? 'opacity-100 visible'
                            : 'opacity-0 invisible'
                        }`}
                      >
                        <span className={``}>{link}</span>
                      </CustomLink>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`${styles.serviceImage} ${
                currentService === 0
                  ? styles.serviceImageVisible
                  : styles.serviceImageHidden
              }`}
            >
              <div className={`${styles.firstServiceImageInner}`}>
                <Image
                  src={'/images/main-page-services/first-service-image.png'}
                  fill
                  alt=''
                  className='hidden lg:block'
                />
                <Image
                  src={'/images/main-page-services/first-service-image-md.png'}
                  fill
                  alt=''
                  className='block lg:hidden'
                />
              </div>
            </div>

            <div
              className={`${styles.serviceImage} ${
                currentService === 1
                  ? styles.serviceImageVisible
                  : styles.serviceImageHidden
              }`}
            >
              <div className={`${styles.secondServiceImageInner}`}>
                <Image
                  src={'/images/main-page-services/second-service-image.png'}
                  fill
                  alt=''
                  className='hidden lg:block'
                />
                <Image
                  src={'/images/main-page-services/second-service-image-md.png'}
                  fill
                  alt=''
                  className='block lg:hidden'
                />
              </div>
            </div>

            <div
              className={`${styles.serviceImage} ${
                currentService === 2
                  ? styles.serviceImageVisible
                  : styles.serviceImageHidden
              }`}
            >
              <div className={`${styles.thirdServiceImageInner}`}>
                <Image
                  src={'/images/main-page-services/third-service-image.png'}
                  fill
                  alt=''
                  className='hidden lg:block'
                />
                <Image
                  src={'/images/main-page-services/third-service-image-md.png'}
                  fill
                  alt=''
                  className='block lg:hidden'
                />
              </div>
            </div>

            <div
              className={`${styles.serviceImage} ${
                currentService === 3
                  ? styles.serviceImageVisible
                  : styles.serviceImageHidden
              }`}
            >
              <div className={`${styles.fourthServiceImageInner}`}>
                <Image
                  src={'/images/main-page-services/fourth-service-image.png'}
                  fill
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ServicesSlider services={services} images={servicesImage} />
    </section>
  );
}
