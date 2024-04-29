const express = require("express");
const path = require("path");
const User = require("./models/userSchema");
const { connection } = require("./db");
const app = express();

const port = 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, "./template");
const publicPath = path.join(__dirname, "./public");
console.log(publicPath);

app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    number: req.body.number,
  };
  if (data.email.length < 4 || data.password.length < 4) {
    res.send("Enter valid credentials").status(401);
  }
  const userExists = await User.findOne({ email: data.email });
  try {
    if (userExists) {
      res.send("user details already exists");
    } else {
      await User.create(data);
      console.log("User Registered");
      res.status(201).redirect("/login");
    }
  } catch {
    res.send("wrong inputs");
  }
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  await connection;
  const user = await User.findOne({ email: data.email });
  try {
    if (user && user.password == data.password) {
      res.status(201).cookie("user", user.username).redirect("/");
    } else {
      res.send("Invalid Credentials").status(401);
    }
  } catch (err) {
    console.log("Error: ", err);
    res.send("Invalid Credentials").status(401);
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("user").redirect("/login");
});

app.get("/apply", (req, res) => {
  res.render("apply");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/jobs", (req, res) => {
  res.render("jobs");
});
app.get("/addjob", (req, res) => {
  res.render("addjob");
});
app.get("/news", (req, res) => {
  res.render("news");
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
