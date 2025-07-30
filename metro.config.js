const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const existingBlockList = [].concat(config.resolver.blockList || []);

config.resolver.blockList = [
    ...existingBlockList,
    /.*\/\.expo\/.*/,    // Expo 的缓存和构建产物目录
];

module.exports = config;