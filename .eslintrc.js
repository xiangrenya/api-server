module.exports = {
  extends: 'airbnb-base',
  env: {
    es6: true,
    node: true
  },
  rules: {
    'consistent-return': 0,
    'no-unused-vars': ['error', { args: 'none' }],
    'no-shadow': 0,
  }
};
