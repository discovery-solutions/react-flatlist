import babel from "@rollup/plugin-babel";
import myPackage from "./package.json";

// the entry point for the library
const input = "src/index.js"
let config = [];
let MODE = ["cjs", "esm", "umd"];

MODE.map(fomart => {
    config.push({
        input: input,
        output: {
            name: myPackage.name,
            file: `dist/index.${fomart}.js`,
            format: fomart,
            exports: "auto"
        },
        external: ["react", /@babel\/runtime/],
        plugins: [
            babel({
                exclude: "node_modules/**",
                plugins: ["@babel/transform-runtime"],
                babelHelpers: "runtime"
            })
        ]
    })
})

export default [
    ...config,
]
