const express = require("express");
const mongoose = require("mongoose");
const loginRoutes = require("./routes/loginroutes");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
//connection creation and creating new dc
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  //allow access from every, elminate CORS

  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(loginRoutes);
app.use(todoRoutes);
mongoose
  .connect("mongodb://localhost:27017/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(4000, () => {
  console.log("running on port 4000");
});
