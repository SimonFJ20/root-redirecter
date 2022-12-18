#!/usr/bin/env node

import http from "http";
import httpProxy from "http-proxy";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
    .command("root-redirecter.js", "Redirect /* to /")
    .default("target", "localhost:8000")
    .alias("t", "target")
    .default("port", 3000)
    .alias("p", "port").argv;

const proxy = httpProxy.createProxyServer({
    target: `http://${argv["target"]}/`,
    ignorePath: true,
    changeOrigin: true,
});

proxy.listen(3000, () => {
    console.log(`Root redirecter proxy on port ${argv["port"]}`);
});
