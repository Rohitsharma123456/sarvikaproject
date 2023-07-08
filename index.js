// const express = require("express");
// const app = express();
// require("dotenv").config();
// const bodyParser = require('body-parser')
// const path = require("path");
// const port = 5000;
// require("./config/database").connect();
// const DocRouter = require("./routes/api");
// app.set("view engine", "ejs")
// // Parse JSON bodies
// app.use(bodyParser.json());

// // Parse URL-encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));





// app.use("/doc", DocRouter);

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 5000;
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();
app.set("view engine", "ejs")
const base_url = process.env.BASE_URL+"/doc/";
require("./config/database").connect();
const DocRouter = require("./routes/api");
// Parse JSON bodies


// Your existing routes and other middleware
app.use("/doc", DocRouter);
app.use("/", (req,res)=>{
    res.render("showlinks",{base_url})
});
// Start the server
app.listen(port, () => {
  console.log('Server is running on port 3000');
});
