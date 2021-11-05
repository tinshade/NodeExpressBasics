const express = require("express");
const path = require("path");
const app = express();

//!USE Request
app.use(express.static(path.join(__dirname, "public")));

//!LISTEN
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

//!GET Request
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/get_big_file", (req, res) => {
  res.sendFile(path.join(__dirname, "data/bigfile.txt"));
});

//!ALL Request
//*Works for all HTTP request types
app.all("*", (req, res) => {
  //Handling 404s
  res.status(404).send("Page Not Found");
});

//POST Request
//PUT Request
//DELETE Request
