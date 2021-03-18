const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const { Store } = require('../../../src/models');

describe('Store model', () => {
  describe('Store validation', () => {
    let newStore;
    beforeEach(() => {
      newStore = {
        name: faker.company.companyName() + uuidv4(),
        description: faker.company.catchPhrase(),
        contactNumber: faker.phone.phoneNumber('+639#########'),
        location: faker.address.streetAddress(),
      };
    });

    test('should correctly validate a valid store', async () => {
      await expect(new Store(newStore).validate()).resolves.toBeUndefined();
    });
  });
});
