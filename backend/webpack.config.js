const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.cs$/,
        use: "raw-loader",
      },
    ],
  },
};
