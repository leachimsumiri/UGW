const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: "./src/main.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
    ],
    module: {
        // configuration regarding modules
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/, // files to exclude
                use: ['babel-loader'],
            },
            {test: /\.vue$/, use: 'vue-loader'},
            {test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        },
                    },
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        // options for resolving module requests
        extensions: ['*', '.js'], // files to load
    },
};
