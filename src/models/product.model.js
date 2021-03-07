const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    sku: { type: String },
    name: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: Array },
    price: { type: Number, require: true },
    weight: { type: Number },
    category: { type: String },
    stock: { type: Number, require: true },
    isPublished: { type: Boolean, default: false },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * Check if sku is taken
 * @param {string} sku - The product's sku
 * @param {ObjectId} [excludeUserId] - The id of the product to be excluded
 * @returns {Promise<boolean>}
 */
productSchema.statics.isSKUTaken = async function (sku, excludeProductId) {
  const product = await this.findOne({ sku, _id: { $ne: excludeProductId } });
  return !!product;
};

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
