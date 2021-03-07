const roles = ['user', 'admin', 'superadmin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getProducts', 'buyProducts']);
roleRights.set(roles[1], ['getProducts', 'manageProducts', 'getCustomers', 'manageCustomers']);
roleRights.set(roles[2], ['getStores', 'manageStores', 'getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};
