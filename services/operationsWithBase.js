const { Transaction } = require('../model/index');

const transactionFind = async data => {
  return await Transaction.find(
    data,
    '_id amount description category transactionType day month year',
  );
};

module.exports = transactionFind;
