import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./router/v1";
import mongoose from "./database";
import path from "path";

//init express
var app = express();

//express middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//init server
const port = 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//router
app.use("/api", routes);
