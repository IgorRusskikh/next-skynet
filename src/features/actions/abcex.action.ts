'use server';

export const getAbcexData = async () => {
  const response = await fetch(
    'https://gateway.abcex.io/api/v1/exchange/client/market-data/order-book/depth?marketId=USDTRUB',
    {
      headers: {
        Authorization: `Bearer ${process.env.ABCEX_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  const formattedData = [
    {
      current: data.ask[0].price + 0.1,
      previous: data.ask[1].price + 0.1,
    },
    {
      current: data.bid[0].price - 0.1,
      previous: data.bid[1].price - 0.1,
    },
  ];

  if (!formattedData.length) {
    return null;
  }

  return formattedData;
};
