const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/Global', {
        target: 'http://192.168.2.248:8075',
        changeOrigin:true,
        pathRewrite: {
            "^/Global": "/"
        }
    }));
}