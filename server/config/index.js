const dotenv = require("dotenv");
const colors = require("colors");

colors.setTheme({
	info: ["cyan", "bold"],
	warn: ["yellow", "bold"],
	success: ["green", "bold"],
	error: ["red", "bold"],
	test: ["blue"],
});

// Load .env only if running locally
if (process.env.NODE_ENV !== "production") {
	const result = dotenv.config();
	if (result.error) {
		console.log("Invalid env provided, exiting the app.".error, result.error);
		process.exit(1);
	}
}
