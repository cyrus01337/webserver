import path from "path";
import url from "url";

import Router from "express-promise-router";
import glob from "glob";

const DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
let router = new Router();
let routes = glob.sync(`${DIRNAME}/**/`);


router.get("/", async (req, res) => res.render("index"));


for (const route of routes.slice(1)) {
    let imported = await import(route);

    router.use(imported.default);
}

export default router;
