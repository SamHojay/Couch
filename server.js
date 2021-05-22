const express = require("express");
const app = express();
const routesUrls = require('./routes/routes');
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://DevOlumide:olumide16@cluster0.wr08j.mongodb.net/myTable?retryWrites=true&w=majority", {useNewUrlParser: true}, () => console.log("myTable connected successfully"));

/*mongoose.connect("mongodb+srv://DevOlumide:olumide16@cluster0.wr08j.mongodb.net/myTable?retryWrites=true&w=majority", () => console.log("Books connected successfully"));*/

app.use(express.json());
app.use(cors());
app.use("/app",routesUrls);
app.listen(4000,() => console.log("Server is up and running"));