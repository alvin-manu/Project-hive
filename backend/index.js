// import dotenv
require('dotenv').config()

// import express
const express = require('express')

// import connection.js
require('./DB/connection')

// import CORS
const cors = require('cors')

// import router
const router = require('./Routes/router')

// create Server
const pfServer = express();

// cors need to be used in server
pfServer.use(cors())

// use middleware to convert json data to js object
pfServer.use(express.json())

// use router
pfServer.use(router)

// we have to use theupload folder outside of the server

pfServer.use('/uploads', express.static('./uploads'))

// define PORT
const PORT = 5000

// run the server
pfServer.listen(PORT, ()=>{
    console.log(`Server is running in ${PORT}`)
})

pfServer.get('/',(req, res)=>{
    res.send("Project fair server is running and waiting for requestsss")
})