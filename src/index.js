import * as wasm from "./build/optimized.wasm";
window.wasm = wasm;

import loader from "@assemblyscript/loader"; // or require
loader.instantiate(
    fetch(wasm.default),
).then(({ exports }) => {
    console.log(exports.add(24, 24))
})