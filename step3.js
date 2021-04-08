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
async function catOrWebCat(path, outPathOrUndef){
  let content = path.startsWith('http') 
    ? await webCat(path)
    : await cat(path);
  if (outPathOrUndef){
    writeOutput(outPathOrUndef, content);
  } else {
    console.log(content);
  }
}

let path;
let outPathOrUndef;

if (process.argv[2] === '--out'){
  outPathOrUndef = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

catOrWebCat(path, outPathOrUndef);
