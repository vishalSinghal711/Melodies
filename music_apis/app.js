// ENTRY POINT OF THE NODE APPLICATION

// const morgan = require('morgan');

// imported express framework installed using npm i express
const express = require("express");
//console.log(typeof express); : returns function

// IMPORTED cors middleware from mpm
/*Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading of resources.
 * Here we used cors becoz. our react application is running on different port and nodejs application on other port so, single-origin policy rejects resourse shareing
 */
const cors = require("cors");

// IMPORTED dotenv package to get access  on .env file
const dotenv = require("dotenv");
//  configured dotenv - just like initialization
dotenv.config();

const app = express(); // app represent an application
//console.log('App is ', typeof app); : returns function
// so, we know express is function
//when we run it -> it returns one more function which we stored in app
//now if we do app. then how we can use (.) operator which can only be used with functions.
//Reason -> Every Function in JS in Object

// Adding Middlewares to every request and response
// to enable cross resourse sharing for every request,response
app.use(cors());
// app.use(morgan());
// to enable Json conversion for every request,response
app.use(express.json());


app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <script>
          alert("✅ Server is running on port ${process.env.PORT || 2345}");
        </script>
        <h3>Server is running</h3>
      </body>
    </html>
  `);
});

app.use("/", require("./routes/user.routes")); // / root or Home
app.use("/", require("./routes/music.routes"));

//now app knows how to handle requests and responses but it needs some place where it can work on those requests or where these requests will be listened

// we will user server for this task
//server.js doing the job for listeneing

const application = app;

module.exports = application;
