/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const path = require('path');
const { Seeder } = require('mongo-seeding');
const config = require('../config/config');
const logger = require('../config/logger');

const User = require('../models/user.model');
const Store = require('../models/store.model');
const Token = require('../models/token.model');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');

  const seeder = new Seeder({
    database: config.mongoose.url,
    dropDatabase: false,
  });

  const collections = seeder.readCollectionsFromPath(path.resolve('./src/seeder/data'));

  const importData = async () => {
    try {
      await seeder.import(collections);
      logger.info('Seed Complete');
      process.exit(1);
    } catch (error) {
      logger.error(error);
      process.exit(1);
    }
  };

  const deleteData = async () => {
    try {
      await User.deleteMany();
      await Store.deleteMany();
      await Token.deleteMany();
      logger.info('Data Destroyed...');
      process.exit();
    } catch (err) {
      logger.error(err);
    }
  };

  if (process.argv[2] === '-i') {
    importData();
  } else if (process.argv[2] === '-d') {
    deleteData();
  }
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
