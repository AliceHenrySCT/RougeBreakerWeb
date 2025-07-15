const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for WASM files - ensure it's in assetExts, not sourceExts
if (!config.resolver.assetExts.includes('wasm')) {
  config.resolver.assetExts.push('wasm');
}

// Ensure proper handling of Skia web assets
config.resolver.platforms = ['native', 'web', 'ios', 'android'];

module.exports = config;