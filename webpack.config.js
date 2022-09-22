const isDevMode = (process.env.NODE_ENV === 'development');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: isDevMode ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            'template': './src/index.html',
        })
    ],
    devServer: {
        watchFiles: ["src/*.html"],
        hot: true,
    },
};