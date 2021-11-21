const registration = require('./registration');
const verify = require('./verify');
const login = require('./login');
const logout = require('./logout');
const balanceUpdate = require('./balanceUpdate');
const currentUser = require('./currentUser');
const balanceUser = require('./balanceUser');

module.exports = {
  registration,
  login,
  logout,
  verify,
  balanceUpdate,
  currentUser,
  balanceUser,
};
