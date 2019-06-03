const bunyan = require('bunyan');
const bunyanDebugStream = require('bunyan-debug-stream');
const { createServer } = require('http');
const { createProxyServer } = require('http-proxy');
const Path = require('path');
const Bundler = require('parcel-bundler');

const backEnd = {
  protocol: 'http',
  host: 'localhost',
  port: 8000,
};

const parcelEnd = {
  protocol: 'http',
  host: 'localhost',
  port: 1234,
};

const options = {};
// point parcel at its "input"
const entryFiles = Path.join(__dirname, '../src', 'index.html');

// init the bundler
const bundler = new Bundler(entryFiles, options);

bundler.serve();

// create a proxy server instance
const proxy = createProxyServer();

// serve
const server = createServer((req, res) => {
  if (req.url.includes('/api/')) {
    proxy.web(req, res, {
      target: backEnd,
      changeOrigin: true,
      autoRewrite: true,
    });
  } else {
    proxy.web(req, res, {
      target: parcelEnd,
      ws: true,
    });
  }
});

const log = bunyan.createLogger({
  name: 'Local Dev Server',
  streams: [{
    level: 'info',
    type: 'raw',
    stream: bunyanDebugStream({
      basepath: __dirname,
      forceColor: true,
    }),
  }],
  serializers: bunyanDebugStream.serializers,
});
log.info('dev proxy server operating at: http://localhost:5050/');

server.listen(5050);
