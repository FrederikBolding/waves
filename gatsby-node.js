var webpack = require("webpack");

// https://github.com/WalletConnect/walletconnect-monorepo/issues/584

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    resolve: {
      fallback: {
        util: require.resolve(`util/`),
        url: require.resolve(`url/`),
        assert: require.resolve(`assert/`),
        crypto: require.resolve(`crypto-browserify`),
        os: require.resolve(`os-browserify/browser`),
        https: require.resolve(`https-browserify`),
        http: require.resolve(`stream-http`),
        stream: require.resolve(`stream-browserify`),
      },
    },
  });
};
