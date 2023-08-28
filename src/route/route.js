const express = require("express")
const route = express.Router()
const multer = require("multer")
const path = require("path")
const csvtojson = require("csvtojson")
const csvfile = require("../model/csvmodel")
const jsontocsv=require("json2csv").Parser

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


route.get("/exportcsv",async(req,res)=>{
const usercsv=[]
const userfile=await csvfile.find({})

userfile.forEach((e)=>{
  const {Name,Address,PhoneNumber,Salary}=e
  usercsv.push({
    Name,Address,PhoneNumber,Salary
  })
})
const csvfiled=["Name","Address","PhoneNumber","Salary"]
const csvparser=new jsontocsv({csvfiled})
const csvdata=csvparser.parse(usercsv)
res.send(csvdata)

})


module.exports = route