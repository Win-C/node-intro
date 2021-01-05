"use strict";

const axios = require("axios");
const fsP = require("fs/promises");
const path = `./${process.argv[2]}`;
const webUrl = `${process.argv[2]}`;


/** Function takes in one argument, path
 *  Read the file with that path, and
 *  Print the contents of that file. */
async function cat(path){
  try {
    let contents = await fsP.readFile(path, "utf8");
    console.log("file contents", contents);
  } catch(err){
    console.error(err);
    process.exit(1);
  }
}


/** given a URL and, using axios, reads the content of that URL 
 *  and prints it to the console. */
async function webCat(webUrl) {
  let site = await axios({ url: `${webUrl}` });
  console.log('site', site)
}


/** gets return from isUrl and calls appropriate function */
function start() {
  if (isUrl()) {
    webCat(webUrl);
  } else {
    cat(path);
  }
}

/** given an argument from the command line
 *  returns true if is url or false if not
 */
function isUrl() {
  
}

start();