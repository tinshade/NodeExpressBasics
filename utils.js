//*Logs the request details
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toLocaleTimeString();
  console.log(`${time} ${method} ${url}`);
  next();
};

const authorize = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("Authorize called");
  if (token) {
    console.log(token);
    //const decoded = jwt.verify(token, 'secret');
  }
  next();
};

module.exports = { logger, authorize };
