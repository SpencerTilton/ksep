module.exports = {
    entry: "./dist/index.js",
    output: {
        path: __dirname,
        sourceMaps: true,
        filename: "public/dist/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
