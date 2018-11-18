/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

const perspective = require("@jpmorganchase/perspective").default;

const table = perspective.worker().table([
    {x: 1, y: 1, z: 1},
    {x: 2, y: 1, z: 2},
    {x: 3, y: 3, z: 4},
    {x: 4, y: 2, z: 2},
], {
    index: "x"
});

table.view().to_json().then(console.log);
