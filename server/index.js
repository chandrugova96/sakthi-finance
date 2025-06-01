const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const http = require("http")
const bodyParser = require("body-parser")
const path = require("path")
const mongoose = require("mongoose")
require("dotenv").config()

require('./config')
const routers = require("./src/routes")
const { DB_URL } = require("./config/db.config")

// Express Application
const app = express()
app.use(helmet())
app.use(cors())
app.use(bodyParser.json({ limit: "3000mb" }))
app.use(bodyParser.urlencoded({ limit: "3000mb", extended: true }))
app.use("/public", express.static(path.join(__dirname, "public")))
routers(app)
const server = http.createServer(app)

//DB connection
mongoose.set("strictQuery", false)
mongoose.connect(DB_URL)
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "))
db.once("open", function () {
    console.log("DB connected successfully")
    server.listen(process.env.APP_PORT, () => {
        console.log(`Server on port : ${process.env.APP_PORT}\n`)
    })
})