"use strict";

const fsP = require("fs/promises");
const axios = require("axios");

/** Function takes in one argument, path
 *  Read the file with that path, and
 *  Print the contents of that file. */
async function cat(path) {
  let content;
  try {
    return await fsP.readFile(path, "utf8");
  } catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
}

/** Function takes in a URL and using axios, reads the 
 *  content of that URL and prints it to the console.
 */
async function webCat(url) {
  let response;
  try {
    return (await axios({ url })).data;
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

/** Function takes in content and path to file to write to */
async function writeOutput(path, content) {
  try {
    await fsP.writeFile(path, content, "utf8");
  } catch (err) {
    console.error(`Error writing to ${path}: ${err}`);
    process.exit(1);
  }
}

/** Function takes in path to get content and path to file to write to
 *  Note: outPathOrUndef may be undefined
 */
async function catOrWebCat(path, outPathOrUndef) {
  let content = path.startsWith('http')
    ? await webCat(path)
    : await cat(path);
  if (outPathOrUndef) {
    writeOutput(outPathOrUndef, content);
  } else {
    console.log(content);
  }
}

const argv = process.argv;
let argAdj = 0; // adjustment for argv index for start of paths
let outPathOrUndef;

if (argv[2] === '--out') {
  argAdj = 2;
  outPathOrUndef = argv[3];
} 

for (let i = 2 + argAdj; i < argv.length; i++) {
  let path = argv[i];
  catOrWebCat(path, outPathOrUndef);
}
