const { Schema, SchemaTypes, model } = require('mongoose')

const transactionSchema = Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Type is required'],
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
)

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction
