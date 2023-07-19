const mongoose=require("mongoose")



mongoose.connect("mongodb+srv://debanjan:debanjan@cluster0.oilnaff.mongodb.net/csv")
.then(()=>{
    console.log("db connect")
}).catch((err)=>console.log(err))