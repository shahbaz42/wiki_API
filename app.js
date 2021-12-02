const express = require("express");
// import the api routes
const apiRoutes = require("./routes/apis.js");

// create an instance of express
const app = express();

// use express.urlencoded to parse the body of the request
app.use(express.urlencoded({ extended: true }));
// use express.static to serve static files
app.use(express.static("public"));

// use the api routes
app.use("/", apiRoutes);

// listen on port 8000
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server started on port ${process.env.PORT || 8000}`);
});
