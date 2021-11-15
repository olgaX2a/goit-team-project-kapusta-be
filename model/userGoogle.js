const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchemaGoogle = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      minlength: 10,
    },
    token: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0.0,
    },
  },
  { versionKey: false, timestamps: true },
);

const userJoiSchemaGoogle = Joi.object({
  name: Joi.string().required,
  email: Joi.string().email().required(),
  balance: Joi.number(),
});

const UserGoogle = model('userGoogle', userSchemaGoogle);

module.exports = {
  UserGoogle,
  userJoiSchemaGoogle,
};
