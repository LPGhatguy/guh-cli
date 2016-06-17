"use strict";

const pack = require("../package");

const message = `
guh CLI v${ pack.version }

Usage: guh <command> <flags>

Commands:
	help ..... Show this screen
	build .... Build the project in the current directory
	version .. Output the current guh version

Flags:
	--debug .. Output verbose debugging information
`;

console.log(message.trim().replace(/\t/g, "    "));