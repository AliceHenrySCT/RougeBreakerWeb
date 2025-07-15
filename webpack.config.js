const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAllowDuplicatePlugins: true,
      },
    },
    argv
  );

  // Add WASM support
  config.resolve.extensions.push('.wasm');
  
  // Handle WASM files
  config.module.rules.push({
    test: /\.wasm$/,
    type: 'asset/resource',
  });

  // Ensure proper handling of Skia
  config.resolve.alias = {
    ...config.resolve.alias,
    '@shopify/react-native-skia/lib/commonjs/web': '@shopify/react-native-skia/lib/module/web',
  };

  return config;
};