if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require('express');
const expressLayouts = require ('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000; //Might need to change port

const indexRouter = require('./routes/index')

//require('dotenv').config();

//app.use(express.urlencoded( { extend: true }));
app.use(express.static('public'));
app.use(expressLayouts)

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("Connected to Mongoose"))

app.use("/", indexRouter)
//
//app.listen(process.env.PORT || 3000)
app.listen(port, () => console.info(`App listening on port ${port}`))