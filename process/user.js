const GET = async ({ req, res, db }) => {
    db.all(`
        select id from user
        where email = ? and pass = ? ;`,
        "admin", "123"
        ,
        (err, rows) => {
            console.log(rows);
        });
}

module.exports = {
    GET: GET
}