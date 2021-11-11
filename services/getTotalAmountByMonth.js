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

// const iuiuiisiid = (result) => {
//   let months = [];
//   let summary = [];
//   result.map((res) => {
//     const reportMonth = res.month;
//     if (!months.includes(reportMonth)) {
//       const month = findMonth(result, reportMonth);
//       const totalResultAmount = totalAmount(month);
//       months.push(reportMonth);
//       summary.push({ reportMonth, totalResultAmount });
//     }
//     return;
//   });
//   return summary;
// };

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
  return summary;
};

// const getTotalAmountByMonth = (result) => {
//   let months = [];
//   let summary = [];
//   result.map((res) => {
//     const reportMonth = res.month;
//     if (!months.includes(reportMonth)) {
//       const month = findMonth(result, reportMonth);
//       const totalResultAmount = totalAmount(month);
//       months.push(reportMonth);
//       summary.push({ reportMonth, totalResultAmount });
//     }
//     return;
//   });
//   return summary;
// };

module.exports = getTotalAmountByMonth;
