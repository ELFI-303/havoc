module.exports = {
  devServer: {
    proxy: '${lambdaUrl}',
    https: true
  }
};
