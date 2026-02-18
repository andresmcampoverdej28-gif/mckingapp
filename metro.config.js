const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Agregar extensiones de source
config.resolver.sourceExts.push('cjs', 'mjs');

// Agregar extensiones de assets
config.resolver.assetExts.push('glb', 'gltf');

module.exports = config;