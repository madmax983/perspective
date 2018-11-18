/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const PerspectivePlugin = require("@jpmorganchase/perspective/webpack-plugin");
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const path = require("path");

module.exports = {
    entry: "./in.js",
    output: {
        filename: "out.js",
        library: "out",
        libraryTarget: "umd",
        libraryExport: "default",
        path: path.resolve(__dirname, "./build")
    },
    plugins: [new PerspectivePlugin(), new HtmlWebpackPlugin(), new StatsWriterPlugin({
        fields: null
    })],
    devtool: "source-map"
};
