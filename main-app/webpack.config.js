const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

const deps = require("./package.json").dependencies;

const printCompilationMessage = require('./compilation.config.js');

module.exports = (_, argv) => ({
  output: {
    // publicPath: "http://localhost:3000/",
    publicPath: "https://e-com-main-app.vercel.app/",
  },


  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, 'src')],
    onListening: function (devServer) {
      const port = devServer.server.address().port

      printCompilationMessage('compiling', port)

      devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage('failure', port)
          } else {
            printCompilationMessage('success', port)
          }
        })
      })
    }
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
      name: "main_app",
      filename: "remoteEntry.js",
      remotes: {
        // product: "product@http://localhost:3001/remoteEntry.js",
        product: "product@https://e-com-product-app-client.vercel.app/remoteEntry.js",
        // auth: "auth@http://localhost:3002/remoteEntry.js",
        auth: "auth@https://ecom-auth-app-client.vercel.app/remoteEntry.js",
        // cart: "cart@http://localhost:3003/remoteEntry.js",
        cart: "cart@https://ecom-cart-app-client.vercel.app/remoteEntry.js",
        // order: "order@http://localhost:3004/remoteEntry.js",
        order: "order@https://e-com-order-app-client.vercel.app/remoteEntry.js",
        // admin: "admin@http://localhost:4000/remoteEntry.js"
        admin: "admin@https://ecom-admin-app-six.vercel.app/remoteEntry.js"
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
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv()
  ],
});
