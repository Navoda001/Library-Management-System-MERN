const express = require("express")
const app = express()

const bookRoutes = require("./routes/BookRoute")
const memberRoutes = require("./routes/MemberRoute")
const authRoutes = require("./routes/AuthRoute")
const lendingRoutes = require("./routes/LendingRoute")
const mongoose = require("mongoose");
const cors = require('cors')
const PORT = process.env.PORT || 3700

//MiddleWares-----------
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET','POST','PATCH','PUT','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials: true
}));
//----------------------

app.use("/booklib/api/v1",bookRoutes)
app.use("/booklib/api/v1",memberRoutes)
app.use("/api/v1",lendingRoutes)
app.use("/booklib/api/v1",authRoutes)

//DB Integrate

mongoose.connect("mongodb://localhost:27017/bookLib108",{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB",err))

app.listen(PORT, ()=>{
    console.log(`App Listening to: ${PORT}`)
})