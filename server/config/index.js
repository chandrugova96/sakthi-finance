const dotenv = require("dotenv");
const colors = require("colors");

colors.setTheme({
	info: ["cyan", "bold"],
	warn: ["yellow", "bold"],
	success: ["green", "bold"],
	error: ["red", "bold"],
	test: ["blue"],
});

let env_file = "";
env_file = ".env";
process.env.is_development_env = true;

// Load the env based on the environment
const loadEnv = dotenv.config({ path: env_file }).error;
if (loadEnv) {
	console.log("Invalid env provided exiting the app.".error, loadEnv);
	process.exit(1);
}