const { readFile } = require("fs");
const file_path = "./data/readfile.txt";

//*Reading data from a file with promises
const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err); //Promise rejected with the given error
      } else {
        resolve(data); //Return data to the promise
      }
    });
  });
};

const getTextPromise = () => {
  console.log("PROMISE: Reading file...");
  getText("./data/readfile.txt")
    .then((res) => {
      console.log("PROMISE: Finished...");
      console.log(res);
    })
    .catch((err) => console.log(err));
};
//*Making async calls
const getTextAsync = async (path) => {
  console.log("ASYNC: Reading file...");
  try {
    console.log("ASYNC: Finished...");
    let res = await getText(path);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

getTextPromise(file_path);
getTextAsync(file_path);
