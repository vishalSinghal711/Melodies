// required the app from app.js which can handle requests and responses
const app = require("./app");

//  required the server package which allows listening
const http = require("http");

// creating the server with the app which knows how to react to requests
const server = http.createServer(app);

const PORT = process.env.PORT || 2345;

// listening at port 2345 and if there is err consoling it
const port = server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("port is = ", port.address().port);
  }
});
