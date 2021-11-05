const http = require("http");
const server = http.createServer((req, res) => {
  //! REQ is the incoming request
  //! RES is the outgoing response
  if (req.url === "/") {
    res.write("Here's the home page");
    res.end();
  }

  if (req.url === "/about") {
    res.write("Here's the about page");
    res.end();
  }

  if (req.url === "/contact") {
    res.write("Here's the contact page");
    res.end();
  }
  res.end(`<h1>404</h1>`);
});

//*Server will emit a request event, subscribe to it, listen for it and respond to it.
server.on("request", (req, res) => {
  res.write("Here's the event handler");
  res.end();
});
server.listen(5000); // listen on port 5000
