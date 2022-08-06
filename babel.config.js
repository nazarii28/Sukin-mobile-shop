module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      'react-native-reanimated/plugin',
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env"
        }
      ]
    ],
    presets: ['babel-preset-expo']
  };
};
