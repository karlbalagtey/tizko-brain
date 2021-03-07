const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    contactNumber: { type: String, required: true },
    location: { type: String, required: true },
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    customers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
storeSchema.plugin(toJSON);
storeSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The store's name
 * @param {ObjectId} [excludeStoreId] - The id of the store to be excluded
 * @returns {Promise<boolean>}
 */
storeSchema.statics.isNameTaken = async function (name, excludeStoreId) {
  const store = await this.findOne({ name, _id: { $ne: excludeStoreId } });
  return !!store;
};

/**
 * @typedef Store
 */
const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
