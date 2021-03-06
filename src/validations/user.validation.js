const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    firstName: Joi.string().allow(null),
    lastName: Joi.string().allow(null),
    userName: Joi.string().allow(null),
    role: Joi.string().required().valid('user', 'admin', 'superadmin'),
    contactNumber: Joi.string().allow(null),
    acceptTerms: Joi.boolean(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    userName: Joi.string(),
    role: Joi.string(),
    contactNumber: Joi.string(),
    acceptTerms: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email().allow(null),
      password: Joi.string().custom(password).allow(null),
      userName: Joi.string().allow(null),
      firstName: Joi.string().allow(null),
      lastName: Joi.string().allow(null),
      contactNumber: Joi.string().allow(null),
      acceptTerms: Joi.boolean().allow(null),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
