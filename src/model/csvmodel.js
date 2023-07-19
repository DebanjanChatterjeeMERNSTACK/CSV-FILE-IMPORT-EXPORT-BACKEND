const mongoose=require("mongoose")


const csvschema=new mongoose.Schema({
    Name:String,
    Address:String,
    PhoneNumber:String,
    Salary:String

})
const Csvschema=new mongoose.model("csv",csvschema)
module.exports=Csvschema