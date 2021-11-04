const { Schema, SchemaTypes, model } = require('mongoose')

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
    },
    owner: {
      type: SchemaTypes.ObjectId || String,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

const Category = model('category', categorySchema)

module.exports = Category
