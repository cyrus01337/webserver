import path from "path";
import url from "url";

import Router from "express-promise-router";

import utils from "utils/server";

const DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
let router = new Router();
let routes = await utils.getAllRoutes(DIRNAME);


router.get("/", async (req, res) => res.render("index"));


for (const route of routes) {
    router.use(route);
}

export default router;
