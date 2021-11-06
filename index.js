const express = require("express");
const path = require("path");
const { people, products } = require("./data/sample");
const app = express();

//!USE Request
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
//!LISTEN
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

//!ALL Request
//*Works for all HTTP request types
app.all("*", (req, res) => {
  //Handling 404s
  res.status(404).send("Page Not Found");
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

//!Querying and sorting
app.get("/search", (req, res) => {
  const { query, limit } = req.query;
  let curated = [...products];
  if (query) {
    curated = curated.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  if (limit) {
    curated = curated.slice(0, Number(limit));
  }
  if (curated.length === 0) {
    return res.status(204).json({ data: [] });
  }
  res.json(curated);
});

//POST Request
app.post("/add_product", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).send("Missing name or price");
  }
  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
//PUT Request
//DELETE Request
