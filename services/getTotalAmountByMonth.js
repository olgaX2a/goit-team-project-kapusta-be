const findYear = (result, numberOfYear) => {
  return result.reduce((amountByYear, transaction) => {
    if (transaction.year === numberOfYear) {
      amountByYear.push(transaction);
    }
    return amountByYear;
  }, []);
};

const findMonth = (result, numberOfMonth) => {
  return result.reduce((amountByMonth, transaction) => {
    if (transaction.month === numberOfMonth) {
      amountByMonth.push(transaction);
    }
    return amountByMonth;
  }, []);
};

const totalAmount = (result) => {
  return result.reduce(
    (amountByMonth, transaction) => amountByMonth + transaction.amount,
    0
  );
};

const getTotalAmountByMonth = (result) => {
  let years = [];
  let summary = [];

  result.map((res) => {
    const reportYear = res.year;
    const year = findYear(result, reportYear);

    if (!years.includes(reportYear)) {
      let months = [];

      year.map((y) => {
        const reportMonth = y.month;

        if (!months.includes(reportMonth)) {
          const month = findMonth(year, reportMonth);
          const totalResultAmount = totalAmount(month);
          months.push(reportMonth);
          summary.push({ reportYear, reportMonth, totalResultAmount });
        }
        return;
      });

      years.push(reportYear);
    }
    return;
  });
  const summarySort = [...summary]
    .sort((first, second) => second.reportYear - first.reportYear)
    .sort((first, second) => {
      if (second.reportYear === first.reportYear) {
        return second.reportMonth - first.reportMonth;
      }
    })
    .slice(0, 6);

  return summarySort;
};

module.exports = getTotalAmountByMonth;
