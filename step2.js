"use strict";

const fsP = require("fs/promises");
const axios = require("axios");

/** Function takes in one argument, path
 *  Read the file with that path, and
 *  Print the contents of that file. */
async function cat(path) {
  let content;
  try {
    content = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
  console.log(content);
}

/** Function takes in a URL and using axios, reads the 
 *  content of that URL and prints it to the console.
 */
async function webCat(url) {
  let response;
  try {
    response = await axios({ url });
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
  console.log(response.data);
}

const path = process.argv[2];

if(path.startsWith("http")){
  webCat(path);
} else {
  cat(path);
}
