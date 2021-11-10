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
  let array = [];
  let summary = [];
  result.map((res) => {
    const reportMonth = res.month;
    if (!array.includes(reportMonth)) {
      const month = findMonth(result, reportMonth);
      const totalResultAmount = totalAmount(month);
      array.push(reportMonth);
      summary.push({ reportMonth, totalResultAmount });
    }
    return;
  });
  return summary;
};

module.exports = getTotalAmountByMonth;
