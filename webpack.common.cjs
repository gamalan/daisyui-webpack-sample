const path = require("path");
const webpack = require("webpack");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        daisyui: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "js/[name].js",
        publicPath: "/build/",
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 2,
                            url: false,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [["autoprefixer"]],
                            },
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new WebpackManifestPlugin({
            map: function (fileDescriptor) {
                fileDescriptor.name = fileDescriptor.name.replace(
                    /^\/(js|css|fonts)\//,
                    "",
                );
                return fileDescriptor;
            },
        }),
    ],
};
