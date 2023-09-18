import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import helmet from "helmet";
import router from "./src/router/index.js";

const port = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(router);

app.listen(port, () => console.log(`serve on port: ${port}`));
