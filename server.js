const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");

const db = require("./config/key").mongoURL;
const user = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

//Connec to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log("error = ", err));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//listen route
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running"));
