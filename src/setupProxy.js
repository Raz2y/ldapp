const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/repositories/LDApps',
        createProxyMiddleware({
            target: 'http://yoda.media.h-da.de:7200',
            changeOrigin: true,
            headers: {
                Connection: 'keep-alive'
            },
            auth: 'student:student01'
        })
    );
};
