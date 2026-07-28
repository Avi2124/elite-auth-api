const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/server.ts",
    target: "node20",
    mode: isProduction ? "production" : "development",
    experiments: {
      outputModule: true,
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
    externalsType: "module",
    externals: [
      nodeExternals({
        importType: "module",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
      extensionAlias: {
        ".js": [".ts", ".js"],
      },
    },
    output: {
      filename: "server.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      module: true,
      library: {
        type: "module",
      },
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "src/generated",
            to: "generated",
            noErrorOnMissing: true,
          },
        ],
      }),
    ],
    optimization: {
      minimize: isProduction,
    },
  };
};