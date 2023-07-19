const express = require("express")
const app = express()
require("./db/connect");
const cors = require("cors")
const csv = require("./route/route")


const port = process.env.PORT || 9000;
app.use(express.json())
app.use(cors())




app.use("/upload", express.static("src/upload"))

app.use(csv)



app.listen(port, () => {
    console.log("server connected")
})
