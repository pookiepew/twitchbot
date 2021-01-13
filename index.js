const express = require("express");
const cors = require("cors");
const volleyball = require("volleyball");
const helmet = require("helmet");

const config = require("./config");

const app = express();
app.use(cors());
app.use(volleyball);
app.use(helmet());
app.use(express.json());

app.use("/v1", () => require("./routes/v1"));

app.use((req, res, next) => {
  const error = new Error("Not Found - " + req.originalUrl);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({
    message: error.message,
    stack: config.NODE_ENV === "production" ? undefined : error.stack,
  });
});

const port = config.PORT || 8888;

const server = app.listen(port, () =>
  console.log(`http://${config.HOST}:` + server.address().port)
);
