const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8080/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
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
				test: /\.svg$/,
				use: [
					{
						loader: require.resolve('babel-loader'),
					},
					{
						loader: require.resolve('@svgr/webpack'),
						options: {
							replaceAttrValues: {
								'#000': 'currentColor',
								'#000000;': 'currentColor',
							},
							svgoConfig: {
								plugins: [
									{ removeViewBox: false },
								],
							},
							titleProp: true,
						},
					},
				],
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
      name: "photom",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
				'./Header': './src/fragments/header',
				'./FetchLoading': './src/fragments/fetch-loading',
				'./Gauge': './src/fragments/gauge',
				'./LiquidChart': './src/fragments/liquid-chart',
				'./LoadingButton': './src/fragments/loading-button',
				'./LoginForm': './src/fragments/login-form',
				'./Table': './src/fragments/table',
				'./i18n': './src/i18n.ts',
				'./wizardWithConfirmDialog': './src/wizards/wizard-with-confirm-dialog',
			},
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
