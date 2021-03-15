const roles = ['user', 'admin', 'superadmin'];

const roleRights = new Map();
roleRights.set(roles[0], ['resetPassword']);
roleRights.set(roles[1], ['getProducts', 'manageProducts', 'getCustomers', 'manageCustomers', 'updateProfile']);
roleRights.set(roles[2], ['getStores', 'manageStores', 'getUsers', 'manageUsers', 'updateProfile']);

module.exports = {
  roles,
  roleRights,
};
