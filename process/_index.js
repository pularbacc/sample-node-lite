const user = require("./user");
const login = require("./login");

const GET = ({ res }) => {
    res.json("Hello world");
}

module.exports = {
    "/": { GET: GET },
    "/user":user,
    "/login":login,
}

