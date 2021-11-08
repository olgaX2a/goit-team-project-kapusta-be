const { User } = require("../model/user.js");
const { BadRequest, NotFound } = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne(
    { email },
    "_id name email balance password verify"
  );
  if (!user) {
    throw new NotFound(`Email ${email} not found`);
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw new BadRequest("Invalid password");
  }
  if (!user.verify) {
    throw new BadRequest("Email not verify");
  }
  const { _id, balance } = user;

  const payload = {
    _id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(_id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      name,
      token,
      balance: balance.toFixed(2),
    },
  });
};

module.exports = login;
