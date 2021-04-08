"use strict";

const fsP = require("fs/promises");

/** Function takes in one argument, path
 *  Read the file with that path, and
 *  Print the contents of that file. */
async function cat(path){
  try {
    let contents = await fsP.readFile(path, "utf8");
    console.log(contents);
  } catch(err){
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
}

cat(process.argv[2]);