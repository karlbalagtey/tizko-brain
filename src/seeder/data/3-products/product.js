const faker = require('faker/locale/en');
const { v4: uuidv4 } = require('uuid');
const stores = require('../2-stores/store');

let products = [];

stores.map((store) => {
  for (let i = 0; i < 200; i++) {
    const product = {
      sku: faker.finance.iban() + uuidv4(),
      name: faker.commerce.productName(),
      description: faker.lorem.sentences(),
      image: [faker.random.image(), faker.random.image(), faker.random.image()],
      weight: Math.random() * (25 - 1),
      price: Math.random() * (1000 - 10) + 10,
      category: faker.commerce.productMaterial(),
      stock: faker.random.number(),
      isPublished: Math.random() < 0.8,
      store: store.id,
    };

    products = [...products, product];
  }
  return products;
});

module.exports = products;
