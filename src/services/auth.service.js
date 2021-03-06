const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (req, res) => {
  const { rt } = req.signedCookies;
  const refreshTokenDoc = await Token.findOne({ token: rt, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token Not Found');
  }
  await refreshTokenDoc.remove();
  await res.clearCookie('rt');
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @param {string} res
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken, res) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);

    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user, res);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    const updatedUser = { ...user, password: newPassword };
    Object.assign(user, updatedUser);
    await user.save();
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
};
