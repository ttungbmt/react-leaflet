import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    debug: true,
    devtool: 'source-map',
    entry: {
        app: path.join(__dirname, 'components/index.js'),
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    plugins: [
                        ['react-transform', {
                            transforms: [{
                                transform: 'react-transform-hmr',
                                imports: ['react'],
                                locals: ['module'],
                            }],
                        }],
                    ],
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url?prefix=font/&limit=5000"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
                // Chỉnh output.publicPath => gắn thêm prefix css image
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader?limit=10000&name=images/[hash].[ext]"
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        publicPath: 'http://localhost:8000/build/',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"',
            },
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('./leaflet-plugins.css', {
            allChunks: true,
        })
    ],
    devServer: {
        colors: true,
        contentBase: __dirname,
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8000,
        progress: true,
        stats: {
            cached: false,
        },
    },
}
