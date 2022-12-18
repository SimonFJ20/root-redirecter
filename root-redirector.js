#!/usr/bin/env node

import http from "http";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
    .command("root-redirecter.js", "Redirect /* to /")
    .default("target", "localhost:8000")
    .alias("t", "target")
    .default("port", 3000)
    .alias("p", "port").argv;

const server = http.createServer((req, res) => {
    console.log("Redirected a request");
    res.writeHead(302, {
        location: `http://${argv["target"]}/`,
    });
    res.end();
});

server.listen(3000, () => {
    console.log(`Root redirecter proxy on port ${argv["port"]}`);
});
