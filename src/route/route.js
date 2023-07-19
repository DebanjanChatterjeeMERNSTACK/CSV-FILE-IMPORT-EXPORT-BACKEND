const express = require("express")
const route = express.Router()
const multer = require("multer")
const path = require("path")
const csvtojson = require("csvtojson")
const csvfile = require("../model/csvmodel")


const storage = multer.diskStorage({
    destination: 'src/upload',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },

})

const upload = multer({ storage: storage })



route.post("/csv", upload.single("file"), (req, res) => {
    const csv = []

    csvtojson()
        .fromFile(req.file.path)
        .then(async (resp) => {
            for (let x = 0; x < resp.length; x++) {
                csv.push({
                    Name: resp[x].Name,
                    Address: resp[x].Address,
                    PhoneNumber: resp[x].PhoneNumber,
                    Salary: resp[x].Salary
                })

            }
            await csvfile.insertMany(csv)
            res.send({ mess: "file upload complete" })
        })


})




route.get("/getcsv", async (req, res) => {

    const csvread = await csvfile.find()
    res.send({ user: csvread })

})


module.exports = route