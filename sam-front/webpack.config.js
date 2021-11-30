const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8081/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8081,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "sam_front",
      filename: "remoteEntry.js",
      remotes: {
				photom: 'photom@http://localhost:8080/remoteEntry.js',
			},
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
				"@material-ui/core": {
					singleton: true,
					requiredVersion: deps["@material-ui/core"],
				},
				"@material-ui/icons": {
					singleton: true,
					requiredVersion: deps["@material-ui/icons"],
				},
				"i18next": {
					singleton: true,
					requiredVersion: deps["i18next"],
				},
				"react-i18next": {
					singleton: true,
					requiredVersion: deps["react-i18next"],
				},
				"material-table": {
					singleton: true,
					requiredVersion: deps["material-table"],
				}
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
