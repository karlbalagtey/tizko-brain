const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createStore = {
  body: Joi.object().keys({
    name: Joi.string().required().name(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    contactNumber: Joi.string().required(),
  }),
};

const getStores = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    location: Joi.string(),
    contactNumber: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getStore = {
  params: Joi.object().keys({
    storeId: Joi.string().custom(objectId),
  }),
};

const updateStore = {
  params: Joi.object().keys({
    storeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      location: Joi.string(),
      contactNumber: Joi.string(),
    })
    .min(1),
};

const deleteStore = {
  params: Joi.object().keys({
    storeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore,
};
