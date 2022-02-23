const path = require('path');

module.exports = {
    // Rename Title
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'E-Shop | Full Stack Vue3 & Express';
                return args
            })
    },

    // Redirect Build Path
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000'
            }
        }
    }
}