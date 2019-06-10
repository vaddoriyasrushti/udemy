const express = require("express");
var app = express();
const bodyparser = require("body-parser");
var cors = require('cors')

app.use(cors())
app.use(bodyparser.json());
app.listen(3002, () => console.log("Express server runnig at port no:3002"));


//categories
var getcategories= require('./categories/get')
var postcategories= require('./categories/post')
var putcategories= require('./categories/put')
var deletecategories= require('./categories/delete')

app.get("/categories", getcategories.getcategories);
app.get("/categories/:id", getcategories.getcategoriesbyid);
app.post("/categories", postcategories.postcategories);
app.put("/categories/:id",putcategories.putcategories);
app.delete("/categories/:id",deletecategories.deletecategories);

//subcategories
var getsubcategories=require('./subcategories/get')
var deletesubcategories=require('./subcategories/delete')

app.get("/subcategories",getsubcategories.getsubcategories);
app.get("/subcategories/id/:id",getsubcategories.getsubcategoriesbyid);
app.get("/subcategories/:catname",getsubcategories.getsubcategoriesbyname);
app.delete("/subcategories/:id",deletesubcategories.deletesubcategories );

//cart
var getcart=require('./cart/get')
var deletecart=require('./cart/delete')
var postcart=require('./cart/post')

app.get("/cart",getcart.getcartitem);
app.get("/cart/:userid",getcart.getcartitembyid);
app.delete("/cart/:userid/:catid",deletecart.deletecartitem);
app.post("/cart", postcart.postcartitem);

//signup
var signup=require('./auth/signup')
app.post("/signup",signup.signup);

//signin
var signin=require('./auth/signin')
app.post("/signin",signin.signin);

