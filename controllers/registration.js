const { User } = require("../model");
const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../helpers/sendEmail");

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Allready registration");
  }
  const hashPasword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verifyToken = nanoid();
  const result = await User.create({
    email,
    password: hashPasword,
    verifyToken,
  });
  const emailVerify = {
    to: email,
    subject: "Сonfirmation of registration",
    html: `<a href='http://localhost:3000/api/users/verify/${verifyToken}' target='_blank'>Confirm email</a>`,
  };
  await sendEmail(emailVerify);
  console.log(emailVerify);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Success register",
    data: { email, verifyToken },
  });
};

module.exports = registration;
