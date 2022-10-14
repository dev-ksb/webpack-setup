const express = require("express");
const path = require("path");

const app = express();

if (process.env.NODE_ENV === "dev") {
  console.log("development mode");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const configuration = require("../webpack/webpack.dev.config");
  const webpack = require("webpack");
  const webpackCompiler = webpack(configuration);

  app.use(
    webpackDevMiddleware(webpackCompiler, configuration.devServer.devMiddleware)
  );

  const webpackHotMiddleware = require("webpack-hot-middleware");
  app.use(webpackHotMiddleware(webpackCompiler));
}

app.use("/static", express.static(path.resolve(__dirname, "../dist")));
app.get("/", (req, res) => {
  const absolutePathToHTML = path.resolve(__dirname, "../dist/index.html");
  res.sendFile(absolutePathToHTML);
});

app.listen(3000, () => {
  console.log("Application is running on http://localhost:3000");
});
