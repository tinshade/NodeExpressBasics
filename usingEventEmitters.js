const EventEmitter = require("events");
const customEmitter = new EventEmitter();
customEmitter.on("response", (message, user) => {
  if (message) {
    console.log(`${user || "Anonymous"} says: ${message}`);
  }
});

customEmitter.emit("response", "Hello World!"); //Message Only
customEmitter.emit("response", "Hello World!", "Abhishek"); //Message and User
customEmitter.emit("response"); //Neither Message nor User
