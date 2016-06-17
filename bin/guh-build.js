"use strict";

const path = require("path");
const fs = require("fs");

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
	const buildPath = path.join(process.cwd(), "build.js");

	if (isFile(buildPath)) {
		require(buildPath);
		return true;
	}

	return false;
}

function build() {
	if (useGulp()) {
		return;
	}

	if (useGuh()) {
		return;
	}

	console.error("Couldn't find build.js or gulpfile.js.");
	console.error("Run 'guh build' from your project root!");
	process.exit(1);
}

build();