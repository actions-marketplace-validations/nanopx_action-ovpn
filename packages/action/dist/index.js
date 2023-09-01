"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var fs = __toESM(require("fs/promises"));
var core = __toESM(require("@actions/core"));
var import_execa = require("execa");
var import_tail = require("tail");
var ovpnConfig = core.getInput("ovpnConfig");
var configPath = ".config.ovpn";
async function run() {
  console.log("Config", ovpnConfig);
  await fs.writeFile(configPath, ovpnConfig, "utf-8");
  try {
    await import_execa.$`sudo openvpn --config ${configPath} --daemon --log .openvpn.log --writepid openvpn.pid`;
  } catch (e) {
    if (e instanceof Error) {
      core.error(e.message);
    } else {
      core.error("Unknown error");
    }
    throw e;
  }
}
run();
