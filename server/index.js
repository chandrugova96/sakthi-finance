const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

require("./config");
const routers = require("./src/routes");
const { DB_URL } = require("./config/db.config");

// Create Express app
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "3000mb" }));
app.use(bodyParser.urlencoded({ limit: "3000mb", extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

routers(app);

// DB connection (only connect once)
let isDbConnected = false;

async function connectToDb() {
	if (!isDbConnected) {
		mongoose.set("strictQuery", false);
		await mongoose.connect(DB_URL);
		isDbConnected = true;
		console.log("✅ DB connected successfully");
	}
}

// Export serverless handler
module.exports = async (req, res) => {
	await connectToDb();
	app(req, res); // Let Express handle the request
};
