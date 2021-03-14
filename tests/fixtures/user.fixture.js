const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const User = require('../../src/models/user.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: mongoose.Types.ObjectId(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  userName: faker.internet.userName() + uuidv4(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  acceptTerms: true,
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  userName: faker.internet.userName() + uuidv4(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  acceptTerms: true,
};

const admin = {
  _id: mongoose.Types.ObjectId(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  userName: faker.internet.userName() + uuidv4(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin',
  acceptTerms: true,
};

const superadmin = {
  _id: mongoose.Types.ObjectId(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  userName: faker.internet.userName() + uuidv4(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'superadmin',
  acceptTerms: true,
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  admin,
  superadmin,
  insertUsers,
};
