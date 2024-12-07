const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL)
// mongoose.connect(process.env.MONGODB_URL)

const userSchema = new mongoose.Schema({
    name : String,
    rollNumber : Number,
    present : {
        type : Boolean,
        default : 0
    }
})

module.exports = mongoose.model("user",userSchema)