function transformWebpackConfig(config) {
  config.module.rules.push({
    test: /\.html$/i,
    loader: 'raw-loader',
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  });

  return config;
}

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  webpackFinal: transformWebpackConfig,
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}
