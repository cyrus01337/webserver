import path from "path";
import process from "process";
import url from "url";

import express from "express";
import favicon from "serve-favicon";
import glob from "glob";
import handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { engine } from "express-handlebars";

// import database from "./src/database";
import helpers from "./src/helpers";
import routes from "./src/routes";

const PORT = process.env.PORT || 3000,
      FAVICON = process.env.FAVICON || "./favicon.ico",
      DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
let app = express();

app.engine("hbs", engine({
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(handlebars),
    layoutsDir: "./src/layouts",
    helpers,
}));

app.enable("trust proxy");
app.set("view engine", "hbs");
app.set("views", glob.sync("./src/routes/**"));
app.set("dirname", DIRNAME);

app.use("/dist", express.static("./dist"));
app.use("/layouts", express.static("./src/layouts"));
app.use(
    express.json(),
    express.static("./src/routes"),
    express.urlencoded({ extended: false }),
    routes
);

try {
    app.use(favicon(FAVICON));
} catch (error) {
    app.get("/favicon.ico", (req, res) => res.sendStatus(204));

    console.error(`Skipped error:\n\n${error.stack}\n`);
}


app.on("error", error => console.error(error.stack));
app.listen(PORT, error => {
    if (error) throw error;

    console.log(`[localhost:${PORT}] Up!`);
});
