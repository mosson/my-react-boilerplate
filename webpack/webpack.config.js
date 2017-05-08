module.exports = {
  entry: {
    index: './src/index.tsx',
    sub: './src/sub.tsx'
  },
  output: function () {
    if (process.env.NODE_ENV === 'production') {
      return {
        path: __dirname + '/../dist',
        filename: '[name].js'
      };
    } else {
      return {
        path: __dirname + '/../public/debug',
        filename: '[name].js'
      };
    }

  }(),

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    // require("react") is external and available on the global var React
    "react": "React",
    "react-dom": "ReactDOM",
    "bluebird": "Promise",
    "lodash": "_"
  },
};
