const config = {
  mode: "production",
  entry: {
    index: "./src/script/source/index.js",
    test: "./src/script/source/test.js",
  },
  output: {
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}

module.exports = config;