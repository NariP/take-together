module.exports = function (api) {
  let config = {};
  const isProd = api.cache(() => process.env.NODE_ENV === 'production');

  if (isProd) {
    config = {
      plugins: [['transform-remove-console', { exclude: ['error', 'warn'] }]],
    };
  }

  return config;
};
