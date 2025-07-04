// const http = require("http")
// const PORT = 3500

// const server = http.createServer((req,res)=>{
//     res.writeHead(200,{"Content-Type":"text/plain"})
//     res.end("Hello MEARN for CMJD - 108")
// });

// server.listen(PORT, ()=>{
//     console.log(`Server started at the PORT: ${PORT}`)
// })




const express = require("express")
const app = express()
const PORT = 3700

const bookRoutes = require("./routes/BookRoute")
const memberRoutes = require("./routes/MemberRoute")
const mongoose = require("mongoose");

app.use(express.json())
app.use("/api/v1",bookRoutes)
app.use("/api/v1",memberRoutes)

//DB Integrate

mongoose.connect("mongodb://localhost:27017/bookLib108",{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB",err))

app.listen(PORT, ()=>{
    console.log(`App Listening to: ${PORT}`)
})