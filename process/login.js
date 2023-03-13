
const token = require("../modules/token");

const POST = async ({ req, res, db }) => {
    const data = req.data;

	const email = data.email;
	const pass = data.pass;

	db.all(`
        select id from user
        where email = ? and pass = ? ;`,
        email, pass
        ,
        (err, rows) => {
            if(rows.length > 0){
				const id = rows[0].id;			

				res.json({
					token: token.encode({
						id: id
					})
				})
			}else{
				res.error(403,{
					mess:"Not true email or pass"
				})
			}
        });
}

module.exports = {
    POST: POST
}