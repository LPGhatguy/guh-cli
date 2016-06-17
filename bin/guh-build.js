"use strict";

const path = require("path");
const fs = require("fs");

let guh;

try {
	guh = require(path.join(process.cwd(), "node_modules/guh-core"));
} catch(e) {
	if (e.code === "MODULE_NOT_FOUND" && e.message.includes("guh-core")) {
		console.error("Local guh not installed!");
		console.error("Run 'npm install guh-core --save-dev'");
		process.exit(1);
	}
}

function isFile(filePath) {
	let stat;

	try {
		stat = fs.statSync(filePath);

		if (stat.isFile()) {
			return true;
		}
	} catch(e) {
		return false;
	}

	return false;
}

// guh-core 2.x project
function useGulp() {
	const gulpfilePath = path.join(process.cwd(), "gulpfile.js");

	if (isFile(gulpfilePath)) {
		require(gulpfilePath);
		return true;
	}

	return false;
}

// guh-core 3.0 project
function useGuh() {
	const buildPath = path.join(process.cwd(), "build.conf.js");

	if (isFile(buildPath)) {
		const config = require(buildPath);

		if (config) {
			return config;
		} else {
			console.error("build.conf.js didn't return a configuration to use!");
			process.exit(1);
		}
	}

	return false;
}

function build() {
	if (useGulp()) {
		return;
	}

	const config = useGuh();
	if (config) {
		const host = new guh.Host();

		host
			.configure(config)
			.configure(host.argBuilder.parse(process.argv.slice(3)))
			.start();

		return;
	}

	console.error("Couldn't find build.js or gulpfile.js.");
	console.error("Run 'guh build' from your project root!");
	process.exit(1);
}

build();