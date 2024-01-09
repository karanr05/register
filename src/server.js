const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const collections = require('./config');

const app = express();

app.use(express.static("public"));

//converting to json format
app.use(express.json());

app.use(express.urlencoded({extended:false}));

//use ejs as the view engine
app.set("view engine",'ejs')

app.get("/",(req,res) => {
    res.render("login")
});

app.get("/signup",(req,res) => {
    res.render("signup")
});

app.post("/signup", async(req,res) => {

    const data = {
        name: req.body.username,
        password: req.body.password
    };

// check already user exists
    const existUser = await collections.findOne({name: data.name});
    if(existUser){
        res.send("User already exits. User another account")
    } else {
        //Hash password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashPassword; //Replace the hash

        const userdata = await collections.insertMany(data);
        console.log(userdata);
        res.redirect("/");
    }
});

// Login user
app.post("/login", async (req,res) => {
    try {
        const check = await collections.findOne({name: req.body.username});
        if(!check){
            res.send("username not found");
        }
        //compare the hash password with original password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.render("home");
        }else{
            res.send("Incorrect password");
        }
    } catch (error) {
        res.render("error");
    }
});


app.listen(3000,() => {
    console.log("Server started...");
});



