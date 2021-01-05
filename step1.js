"use strict";

const fsP = require("fs/promises");
const path = `./${process.argv[2]}`;

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

cat(path);