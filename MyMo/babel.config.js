module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components',
            '@context/*': './src/context/*',
            '@hooks/*': './src/hooks/*',
            '@models/*': './src/models/*',
            '@theme/*': './src/theme/*',
            '@utils/*': './src/utils/*',
          },
        },
      ],
    ],
  };
};
