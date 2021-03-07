/* eslint-disable no-plusplus */
const faker = require('faker');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

let users = [];

// create 200 customers
for (let i = 0; i < 200; i++) {
  const newFakedUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('password', 10),
    role: 'user',
    acceptTerms: true,
    contactNumber: faker.phone.phoneNumber('+639#########'),
    shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    billingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    verified: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };

  users = [...users, newFakedUser];
}

// create 100 admin
for (let i = 0; i < 100; i++) {
  const newFakedAdmin = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('password', 10),
    role: 'admin',
    acceptTerms: true,
    contactNumber: faker.phone.phoneNumber('+639#########'),
    shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    billingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    verified: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };

  users = [...users, newFakedAdmin];
}

const admin = [
  {
    _id: new ObjectId('5efec5f82516e36a501ceaaa'),
    firstName: 'Patrick',
    lastName: 'Castro',
    userName: 'PatrickCas',
    email: 'ppcc@tizko.com',
    password: bcrypt.hashSync('password', 10),
    role: 'superadmin',
    acceptTerms: true,
    contactNumber: faker.phone.phoneNumber('+639#########'),
    shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    billingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    verified: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  },
  {
    _id: new ObjectId('5efea341cb4e4c61fafb8c35'),
    firstName: 'Karl',
    lastName: 'Balagtey',
    userName: 'MaroBalag',
    email: 'kmb@tizko.com',
    password: bcrypt.hashSync('password', 10),
    role: 'superadmin',
    acceptTerms: true,
    contactNumber: faker.phone.phoneNumber('+639#########'),
    shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    billingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    verified: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  },
  {
    _id: new ObjectId('5c8a1d5b0190b214360dc031'),
    firstName: 'Pauline',
    lastName: 'Castro',
    userName: 'PaulineCas',
    email: 'pmcc@tizko.com',
    password: bcrypt.hashSync('password', 10),
    role: 'user',
    acceptTerms: true,
    contactNumber: faker.phone.phoneNumber('+639#########'),
    shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    billingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    verified: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  },
  {
    _id: new ObjectId('5c8a1d5b0190b214360dc032'),
    firstName: 'Raphael',
    lastName: 'Castro',
    userName: 'Rapha',
    email: 'rcc@tizko.com',
    password: bcrypt.hashSync('password', 10),
    role: 'user',
    acceptTerms: true,
    contactNumber: faker.phone.phoneNumber('+639#########'),
    shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    billingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    verified: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  },
  {
    _id: new ObjectId('5f8fefcdc3e019936e1fc7b7'),
    firstName: 'Kilo',
    lastName: 'Man',
    userName: 'Kiloman',
    email: 'admin@sm.com.ph',
    password: bcrypt.hashSync('password', 10),
    role: 'admin',
    acceptTerms: true,
    contactNumber: faker.phone.phoneNumber('+639#########'),
    shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    billingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    verified: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  },
  {
    _id: new ObjectId('5f9399caca9b77ef5e75fef4'),
    firstName: 'Eurich',
    lastName: 'De Guzman',
    userName: 'VictaGarcia',
    email: 'admin@robinsons.com.ph',
    password: bcrypt.hashSync('password', 10),
    role: 'admin',
    acceptTerms: true,
    contactNumber: faker.phone.phoneNumber('+639#########'),
    shippingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    billingAddress: `${faker.address.streetAddress()}, ${faker.address.city()}`,
    verified: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  },
  {
    _id: new ObjectId('5f939a21ac616e20f87c0d61'),
    firstName: 'Erick',
    lastName: 'Ducusin',
    userName: 'ErikDucs',
    email: 'admin@puregold.com.ph',
    password: bcrypt.hashSync('password', 10),
    role: 'admin',
    acceptTerms: true,
    contactNumber: faker.phone.phoneNumber('+639#########'),
    verified: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  },
  {
    _id: new ObjectId('5f8fefd60488fc06f488a533'),
    firstName: 'Victor',
    lastName: 'Magtanggol',
    userName: 'victorPablo',
    email: 'customer@tizko.com',
    password: bcrypt.hashSync('password', 10),
    role: 'user',
    acceptTerms: true,
    contactNumber: faker.phone.phoneNumber('+639#########'),
    verified: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  },
];

users = [...users, admin];

module.exports = users;
