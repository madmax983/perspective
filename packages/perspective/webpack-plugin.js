/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

const path = require("path");

const BASE_PATH = path.join(__dirname, "es", "js");
const RUNTIME_PATH = path.join(BASE_PATH, "runtimes");
const WORKER_PATH = path.join(BASE_PATH, "workers");

const WORKER_LOADER_PATH = require.resolve("./src/loader/file_worker_loader");
const WASM_LOADER_PATH = require.resolve("./src/loader/cross_origin_file_loader.js");
const BLOB_LOADER_PATH = require.resolve("./src/loader/blob_worker_loader.js");

const DEFAULT_PLUGIN_OPTIONS = {
    build_worker: false
};

class PerspectiveWebpackPlugin {
    constructor(options = DEFAULT_PLUGIN_OPTIONS) {
        this.options = options;
    }

    apply(compiler) {
        const rules = [];

        if (this.options.build_worker) {
            rules.push({
                test: /\.js$/,
                include: [
                    WORKER_PATH
                ],
                use: [{
                    loader: WORKER_LOADER_PATH,
                    options: {name: "[name].js", compiled: true}
                }, {
                    loader: BLOB_LOADER_PATH,
                    options: {name: "[name].worker.js"}
                }]
            });
        } else {
            rules.push({
                test: /\.js$/,
                include: [
                    WORKER_PATH
                ],
                use: {
                    loader: WORKER_LOADER_PATH,
                    options: {name: "[name].js"}
                }
            });
        }

        rules.push({
            test: /\.js$/,
            include: [
                RUNTIME_PATH
            ],
            use: {
                loader: WASM_LOADER_PATH,
                options: {
                    name: "[name]"
                }
            }
        });

        const compilerOptions = compiler.options;
        const moduleOptions = compilerOptions.module || (compilerOptions.module = {});
        moduleOptions.rules = (moduleOptions.rules || []).concat(rules);
    }
}

module.exports = PerspectiveWebpackPlugin;
