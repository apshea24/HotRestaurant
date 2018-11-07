const express = require("express");

const path = require("path");

var PORT = process.env.PORT || 8000;
let app = express();

let reservations = [];
let waitlist = [];

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT)
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"))
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"))
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"))
});

app.get("/api/tables", function(req, res) {
    return res.json(reservations)
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist)
});

app.post("/api/tables", function(req, res) {
    let newRes = req.body;

    if (reservations.length > 4) {
        waitlist.push(newRes)
    } else {
        reservations.push(newRes)
    }

    console.log(req.body)


    res.json(newRes);
});
