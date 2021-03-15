const faker = require('faker');
const { ObjectId } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const { Store } = require('../../../src/models');

describe('Store model', () => {
  describe('Store validation', () => {
    let newStore;
    beforeEach(() => {
      newStore = {
        name: faker.company.companyName() + uuidv4(),
        description: faker.company.catchPhrase(),
        image: faker.image.imageUrl(),
        contactNumber: faker.phone.phoneNumber('+639#########'),
        location: faker.address.streetAddress(),
        admins: [
          new ObjectId('5efec5f82516e36a501ceaaa'),
          new ObjectId('5efea341cb4e4c61fafb8c35'),
          new ObjectId('5f8fefcdc3e019936e1fc7b7'),
        ],
        customers: [
          new ObjectId('5c8a1d5b0190b214360dc031'),
          new ObjectId('5c8a1d5b0190b214360dc032'),
          new ObjectId('5f8fefd60488fc06f488a533'),
        ],
      };
    });

    test('should correctly validate a valid store', async () => {
      await expect(new Store(newStore).validate()).resolves.toBeUndefined();
    });
  });
});
