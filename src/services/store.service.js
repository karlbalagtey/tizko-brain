const httpStatus = require('http-status');
const { Store } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a store
 * @param {Object} storeBody
 * @returns {Promise<Store>}
 */
const createStore = async (storeBody) => {
  if (await Store.isNameTaken(storeBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const store = await Store.create(storeBody);
  return store;
};

/**
 * Query for stores
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStores = async (filter, options) => {
  const stores = await Store.paginate(filter, options);
  return stores;
};

/**
 * Get store by id
 * @param {ObjectId} id
 * @returns {Promise<Store>}
 */
const getStoreById = async (id) => {
  return Store.findById(id);
};

/**
 * Get store by name
 * @param {string} name
 * @returns {Promise<Store>}
 */
const getStoreByName = async (name) => {
  return Store.findOne({ name });
};

/**
 * Update store by id
 * @param {ObjectId} storeId
 * @param {Object} updateBody
 * @returns {Promise<Store>}
 */
const updateStoreById = async (storeId, updateBody) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  }
  if (updateBody.name && (await Store.isNameTaken(updateBody.name, storeId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(store, updateBody);
  await store.save();
  return store;
};

/**
 * Delete store by id
 * @param {ObjectId} storeId
 * @returns {Promise<Store>}
 */
const deleteStoreById = async (storeId) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  }
  await store.remove();
  return store;
};

module.exports = {
  createStore,
  queryStores,
  getStoreById,
  getStoreByName,
  updateStoreById,
  deleteStoreById,
};
