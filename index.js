require("dotenv").config()
const express = require("express")
const app = express();
const QRCode = require('qrcode');

app.use(express.json())
app.use(express.urlencoded(true))

const userdb = require("./db/userdb");
app.get("/", (req, res) => {
    res.send("slash page")
})

app.get('/generateQR', async (req, res) => {
    try {
        const data = await userdb.find();
        console.log(data);
        data.forEach( async (elem) => {
            console.log(elem)
            const url = `http://localhost:3000/attendance/${elem.rollNumber}`
            const qrCodeImage = await QRCode.toDataURL(url);
            res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`);
        })
    } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/attendance/:rollNumber" , async (req,res) => {
    const rollNumber = req.params.rollNumber
    const user = await userdb.findOne({ rollNumber : rollNumber})
    console.log(user)
    user.present = 1
    await user.save()
    res.send(user)
})


const register = require("./Routes/register");

app.use("/register", register);



app.listen(3000)