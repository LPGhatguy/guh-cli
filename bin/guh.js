#!/usr/bin/env node
"use strict";

const commands = ["help", "version", "build"];

const aliases = {
	h: "help",
	"-h": "help",
	"/h": "help",
	v: "version",
	"-v": "version",
	b: "build"
};

let command = process.argv[2];

if (!command) {
	command = "help";
}

if (aliases[command]) {
	command = aliases[command];
}

if (!commands.includes(command)) {
	console.error(`"${ command }" isn't a valid guh command. Try "guh help"`);
	process.exit(1);
}

require(`./guh-${ command }`);