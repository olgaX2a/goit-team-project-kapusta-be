const registration = require("./registration");
const verify = require("./verify");
const login = require("./login");
const logout = require("./logout");
const balanceUpdate = require("./balanceUpdate");

module.exports = {
  registration,
  login,
  logout,
  verify,
  balanceUpdate,
};
