module.exports = {
  configureWebpack: {
    externals: {
      vue: "Vue",
    },
  },
  devServer: {
    disableHostCheck: true,
  },
};
