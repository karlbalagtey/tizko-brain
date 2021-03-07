const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    sku: Joi.string(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required(),
    weight: Joi.number(),
    category: Joi.string(),
    stock: Joi.number(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.string(),
    weight: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      sku: Joi.string().empty(''),
      name: Joi.string().empty(''),
      description: Joi.string().empty(''),
      price: Joi.number().empty(''),
      weight: Joi.number().empty(''),
      category: Joi.string().empty(''),
      stock: Joi.number().empty(''),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
