import pgPromise from "pg-promise";

const pgp = pgPromise(),
      DETAIL = "postgres";
const DB = pgp({
    password: DETAIL,
    user: DETAIL
});

export { DB };
