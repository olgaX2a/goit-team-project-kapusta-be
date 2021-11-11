const { Schema, SchemaTypes, model } = require('mongoose');
const { INCOME, EXPENSE } = require('../helpers');

const transactionSchema = Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    transactionType: {
      type: String,
      enum: [INCOME, EXPENSE],
      required: [true, 'Transactions is required'],
    },
    day: {
      type: Number,
      required: [true, 'Day is required'],
    },
    month: {
      type: Number,
      required: [true, 'Month is required'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const Transaction = model('transaction', transactionSchema);

module.exports = Transaction;
