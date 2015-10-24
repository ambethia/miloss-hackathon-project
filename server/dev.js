/* eslint no-console: 0 */

import webpack from 'webpack';
import httpProxy from 'http-proxy';
import WebpackDevServer from 'webpack-dev-server';
import config from './../webpack.config.babel.js';

module.exports = (app) => {
  const proxy = httpProxy.createProxyServer();
  const server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  server.listen(8080);

  app.all('*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });

  proxy.on('error', (error) => {
    console.log(`Proxy Error: ${error.message}`);
  });
};
