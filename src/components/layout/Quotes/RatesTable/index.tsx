import { useEffect, useState } from 'react';

import Image from 'next/image';
import { getAbcexData } from '@/features/actions/abcex.action';
import styles from './RatesTable.module.css';
import { useTranslations } from 'next-intl';

interface RateData {
  source: string;
  quote: string;
  value: number;
  previous_value: number;
  type: '' | 'buy' | 'sell';
}

export default function RatesTable() {
  const [ratesData, setRatesData] = useState<RateData[]>([]);
  const [err, setErr] = useState('');

  const t = useTranslations('Quotes');

  useEffect(() => {
    const fetchInvestingData = async () => {
      try {
        const response = await fetch(
          'https://dev.admin.skynetgroup.ru/api/quotes'
        );
        if (!response.ok) {
          setErr(
            'Не удалось получить данные о котировках: Investing и Profinance'
          );
          return;
        }
        const { data } = await response.json();
        setRatesData((prev) => [...prev, ...data]);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchGarantexData = async () => {
      try {
        const response = await fetch(
          'https://garantex.org/api/v2/depth?market=usdtrub'
        );
        const data = await response.json();
        if (data.bids.length >= 2 && data.asks.length >= 2) {
          const garantexBuyRate: RateData = {
            source: 'GARANTEX',
            quote: 'USDT/RUB',
            value: parseFloat(data.bids[0].price),
            previous_value: parseFloat(data.bids[1].price),
            type: 'buy',
          };
          const garantexSellRate: RateData = {
            source: 'GARANTEX',
            quote: 'USDT/RUB',
            value: parseFloat(data.asks[0].price),
            previous_value: parseFloat(data.asks[1].price),
            type: 'sell',
          };
          setRatesData((prev) => [...prev, garantexBuyRate, garantexSellRate]);

          console.log(ratesData);
        } else {
          console.error('Insufficient data from Garantex API.');
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCBRData = async () => {
      try {
        const response = await fetch(
          'https://www.cbr-xml-daily.ru/daily_json.js'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Извлечение курса USD
        const usdRate = data.Valute.USD;
        const buyRate: RateData = {
          source: 'ЦБ РФ',
          quote: 'USD/RUB',
          value: usdRate.Value,
          previous_value: usdRate.Previous,
          type: 'buy',
        };

        // Добавляем курс продажи
        const sellRate: RateData = {
          source: 'ЦБ РФ',
          quote: 'USD/RUB',
          value: usdRate.Previous,
          previous_value: usdRate.Previous, // Можно использовать предыдущий курс как предыдущий
          type: 'sell',
        };

        setRatesData((prev) => [...prev, buyRate, sellRate]);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    const fetchAbcexData = async () => {
      const data = await getAbcexData();

      console.log(data);

      if (data) {
        const abcexBuyRate: RateData = {
          source: 'ABCEX',
          quote: 'USDT/RUB',
          value: data[0].current,
          previous_value: data[0].previous,
          type: 'buy',
        };

        const abcexSellRate: RateData = {
          source: 'ABCEX',
          quote: 'USDT/RUB',
          value: data[1].current,
          previous_value: data[1].previous,
          type: 'sell',
        };

        setRatesData((prev) => [...prev, abcexBuyRate, abcexSellRate]);
      }
    };

    fetchInvestingData();
    fetchGarantexData();
    fetchCBRData();
    fetchAbcexData();

    // const interval = setInterval(() => {
    //   fetchInvestingData();
    //   fetchGarantexData();
    //   fetchCBRData(); // Обновляем данные ЦБ РФ
    // }, 60 * 1000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.ratesTable}>
        <div className={styles.tableHeader}>
          <p className={styles.colTitle}>{t('source')}</p>
          <p className={styles.colTitle}>{t('currency')}</p>
          <p className={styles.colTitle}>{t('rates')}</p>
        </div>
        <div className={styles.tableBody}>
          <div className={styles.tableRow}>
            <p className={styles.source}>
              GARANTEX <span className={styles.type}>{t('buy')}</span>
            </p>
            <p className={styles.currency}>USDT/RUB</p>
            <div className={styles.price}>
              <span className={styles.emptyRate}>—</span>
            </div>
          </div>
          <div className={styles.tableRow}>
            <p className={styles.source}>
              GARANTEX <span className={styles.type}>{t('sell')}</span>
            </p>
            <p className={styles.currency}>USDT/RUB</p>
            <div className={styles.price}>
              <span className={styles.emptyRate}>—</span>
            </div>
          </div>
          {ratesData.map((rate, index) => {
            const difference =
              rate.previous_value !== 0
                ? (
                    ((rate.value - rate.previous_value) / rate.previous_value) *
                    100
                  ).toFixed(2)
                : '0.00';
            return (
              <div key={index} className={styles.tableRow}>
                <p className={styles.source}>
                  {rate.source}{' '}
                  {rate.type && (
                    <span className={styles.type}>{t(`${rate.type}`)}</span>
                  )}
                </p>
                <p className={styles.currency}>{rate.quote}</p>
                <div className={styles.price}>
                  <span>
                    <span>{rate.value.toFixed(2)}</span>
                    <div className={styles.arrowContainer}>
                      <Image
                        src={`/images/quotes/${
                          Number(difference) < 0 ? 'fall-price' : 'up-price'
                        }.png`}
                        fill
                        alt='price change'
                      />
                    </div>
                  </span>
                  <span
                    className={`${styles.difference} ${
                      Number(difference) < 0
                        ? 'text-primary-red'
                        : 'text-[#23A26D]'
                    }`}
                  >
                    {difference}% (
                    {(rate.value - rate.previous_value).toFixed(2)})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
