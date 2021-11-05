const express = require("express");
const path = require("path");
const { people, products } = require("./data/sample");
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

//! Getting all users
app.get("/get_people", (req, res) => {
  res.json(people);
});

//!Getting a single user
app.get("/get_people/:userID", (req, res) => {
  const userID = Number(req.params.userID);
  const user = people.find((person) => person.id === userID);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
});

app.get("/get_products", (req, res) => {
  let curated = null;
  if (req.query.name) {
    curated = products.filter(
      (product) => product.name.includes(req.query.name) //*Find by wildcard name
    );
  } else if (req.query.price) {
    curated = products.filter(
      (product) => product.price === req.query.price //*Find by exact price
    );
  }

  if (!curated) {
    return res.json(products); //!Getting filtered products
  }
  res.json(products); //!Getting all products
});

//!Getting a single product
app.get("/get_products/:productID", (req, res) => {
  const prodID = Number(req.params.userID);
  const prod = products.find((product) => product.id === prodID);
  if (!prod) {
    return res.status(404).send("Product not found");
  }
  res.json(prod);
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
