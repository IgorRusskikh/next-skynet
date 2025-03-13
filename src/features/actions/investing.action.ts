'use server';

export const getInvestingRates = async () => {
  try {
    const response = await fetch('https://dev.admin.skynetgroup.ru/api/quotes');

    console.log(response);

    if (!response.ok) {
      return;
    }

    const { data } = await response.json();

    console.log(data);

    return data;
  } catch (err) {
    console.error(err);
  }
};
