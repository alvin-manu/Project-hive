// import mongoose
const mongoose = require('mongoose')

// url used to connect with mongo db atlas
const connectionString = process.env.DATABASE_URL

mongoose.connect(connectionString).then((res)=>{
    console.log("Mongodb connected successfully")
}).catch((err)=>{
    console.log(err)
})