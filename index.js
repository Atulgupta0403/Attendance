require("dotenv").config()
const express = require("express")
const app = express();


app.get("/" , (req,res) => {
    res.send("slash page")
})


app.listen(3000)