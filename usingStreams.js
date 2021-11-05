const { createReadStream, writeFileSync, existsSync } = require("fs");
const http = require("http");

const big_file_path = "./data/bigfile.txt";

const createBigFile = (path, iters) => {
  for (let i = 0; i < iters; i++) {
    writeFileSync(path, `This is line number ${i}\n`, { flag: "a" });
  }
};

if (!existsSync(big_file_path)) {
  createBigFile(big_file_path, 10000);
}

function noServerTest() {
  const stream = createReadStream(big_file_path, {
    encoding: "utf-8",
    highWaterMark: 1024,
  }); //*Reads 1kb at a time in utf-8 encoding

  stream.on("data", (chunk) => {
    console.log(chunk); //! This will print the data in buffer chunks
  });

  stream.on("error", (err) => console.log(err));
}

//noServerTest();

//! This is the server
http
  .createServer((req, res) => {
    if (req.url === "/rw_chunk_demo") {
      const fileStream = createReadStream(big_file_path, {
        encoding: "utf-8",
        highWaterMark: 1024,
      });
      fileStream.on("open", (chunk) => {
        console.log(chunk);
        fileStream.pipe(res);
      });
      fileStream.on("error", (err) => res.end(err));
    }
  })
  .listen(3000);
