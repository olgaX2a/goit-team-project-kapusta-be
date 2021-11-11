const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      minlength: 10,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    balance: {
      type: Number,
      default: 0.0,
    },
  },
  { versionKey: false, timestamps: true }
);

const userJoiSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  balance: Joi.number(),
});

const balanceJoiSchema = Joi.object({
  balance: Joi.number().required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  userJoiSchema,
  balanceJoiSchema,
};
