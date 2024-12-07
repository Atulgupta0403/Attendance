const userdb = require("../db/userdb");

const register = async (req,res) => {
    const {name , rollNumber} = req.body;
    const user = await userdb.create({
        name,
        rollNumber
    })
    res.send(user)
}


module.exports = register;