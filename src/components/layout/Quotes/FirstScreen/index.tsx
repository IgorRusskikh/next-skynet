'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import RatesTable from '../RatesTable';
import styles from './FirstScreen.module.css';

export default function FirstScreen() {
  const [formattedDate, setFormattedDate] = useState('');

  const t = useTranslations('Quotes');
  const locale = useLocale();

  useEffect(() => {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const yearSuffix = locale === 'ru' ? 'г.' : '';
    const year = currentDate.getFullYear().toString();

    const formattedDate = `${day}.${month}.${year}${yearSuffix}`;
    setFormattedDate(formattedDate);
  }, []);

  return (
    <section id='rates' className={`${styles.rates}`}>
      <div>
        <div>
          <p className={`${styles.updated}`}>
            {t('updated')}: {formattedDate}
          </p>
          <h1 className={`${styles.header}`}>
            {t('currency-rates')}
            <span className='text-primary-red'>.</span>
          </h1>
        </div>

        <div className={`${styles.tableWrapper}`}>
          <RatesTable />
        </div>
      </div>
    </section>
  );
}
