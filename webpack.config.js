var path = require('path');

module.exports = {
    entry: "./lib/board.js",
    output: {
        path: path.resolve(__dirname),
        filename: "bundle.js"
    },
    devtool: 'source-map',
};
