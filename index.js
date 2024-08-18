const express = require("express");
const {connection} = require("./config/db");
const {userRouter} = require("./routes/User.route");
const { noteRouter } = require("./routes/Note.route");
const { authenticate } = require("./middlewares/authenticate.middleware");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use("/users", userRouter);
app.use(authenticate)
app.use("/notes", noteRouter);



app.listen(8080, async() => {
    try {
        await connection;
        console.log("Connected to database");
    } catch (err) {
        console.log("Can't connect to database");  
        console.log(err);
    }
    console.log("server is running at port 8080"); 
})





































































/*

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.get("/data", (req, res) => {
    const token = req.headers.token;

    jwt.verify(token, 'gupta', (err, decoded) => {
        if(err) {
            res.send("Invalid Token")
            console.log(err);
        }
        else {
            res.send("Your Data Page is Here");
        }
    });
});

app.get("/cart", (req, res) => {
    const token = req.headers.token;

    jwt.verify(token, 'gupta', (err, decoded) => {
        if(err) {
            res.send("Invalid Token")
            console.log(err);
        }
        else {
            res.send("Your Cart Page is Here");
        }
    });
});

app.get("/contact", (req, res) => {
    res.send("Contact Page");
});

*/