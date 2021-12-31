import Router from "express-promise-router";

let router = new Router();


router.get("/", async (req, res) => res.render("index"));


export default router;
