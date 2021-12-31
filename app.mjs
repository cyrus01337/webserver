import path from "path";
import process from "process";
import url from "url";

import handlebars from "handlebars";
import express from "express";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { engine } from "express-handlebars";

// import database from "./src/database";
import helpers from "./src/helpers";
import routes from "./src/routes";

const PORT = process.env.PORT || 3000,
      DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
let app = express();

app.engine("hbs", engine({
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(handlebars),
    layoutsDir: "./src/layouts",
    helpers,
}));

app.set("trust proxy", true);
app.set("view engine", "hbs");
app.set("views", "./src/routes");
app.set("dirname", DIRNAME);

app.use(
    express.json(),
    express.static("./dist"),
    express.static("./src/layouts"),
    express.static("./src/routes"),
    express.urlencoded({ extended: false }),
    routes
);


app.on("error", error => console.error(error.stack));
app.listen(PORT, error => {
    if (error) throw error;

    console.log(`[localhost:${PORT}] Up!`);
});
