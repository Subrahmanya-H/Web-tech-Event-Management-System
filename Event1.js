var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path"); // Correct path module

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(urlencodedParser);

// MySQL connection
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "event_management_system",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected");

  // Create table with EVENTID as AUTO_INCREMENT
  let emstab = `CREATE TABLE IF NOT EXISTS events (
    EVENTID INT AUTO_INCREMENT PRIMARY KEY,
    STARTDATE DATE NOT NULL,
    LOC VARCHAR(255),
    EVENTTITLE VARCHAR(255) NOT NULL,
    IMAGE LONGBLOB,
    EVENTDESC VARCHAR(255) NOT NULL,
    URL VARCHAR(255)
  )`;

  con.query(emstab, function (err, result) {
    if (err) throw err;
    console.log("Table created or already exists");
  });

  // Create table for Users
  let userstab = `CREATE TABLE IF NOT EXISTS users (
    USERID INT AUTO_INCREMENT PRIMARY KEY,
    USERNAME VARCHAR(255) NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL
  )`;

  con.query(userstab, function (err, result) {
    if (err) throw err;
    console.log("Users table created or already exists");
  });
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Route to serve the HTML file
app.get("/forms", function (req, res) {
  res.sendFile(path.join(__dirname, "Dept Details.html")); // Update path to correct 'forms.html'
});

// Login API
app.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var sql = "SELECT * FROM users WHERE USERNAME = ? AND PASSWORD = ?";
  con.query(sql, [username, password], function (err, result) {
    if (err) throw err;

    if (result.length > 0) {
      res.send("Login successful");
    } else {
      res.send("Invalid username or password");
    }
  });
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Route to serve the HTML file
app.get("/forms", function (req, res) {
  res.sendFile(path.join(__dirname, "Dept Details.html")); // Update path to correct 'forms.html'
});

// Add new event
app.post("/addevent", function (req, res) {
  var title = req.body.title;
  var sdate = req.body.sdate;
  var loc = req.body.loc;
  var image = req.body.image;
  var desc = req.body.EVENTDESC;
  var url = req.body.URL;

  var sql =
    "INSERT INTO events (EVENTTITLE, STARTDATE, LOC, IMAGE, EVENTDESC, URL) VALUES (?, ?, ?, ?, ?, ?)";
  con.query(sql, [title, sdate, loc, image, desc, url], function (err, result) {
    if (err) throw err;
    console.log("Event added with ID:", result.insertId); // Log the auto-generated ID
    res.send(`Event added successfully with ID: ${result.insertId}`);
  });
});

// Delete event
app.post("/deleteevent", function (req, res) {
  var eid = req.body.eid;

  var sql = "DELETE FROM events WHERE EVENTID = ?";
  con.query(sql, [eid], function (err, result) {
    if (err) throw err;
    console.log("Event deleted");
    res.send("Event deleted successfully");
  });
});

// Update event
app.post("/updateevent", function (req, res) {
  var eid = req.body.eid;
  var title = req.body.title;
  var sdate = req.body.sdate;
  var loc = req.body.loc;
  var image = req.body.image;
  var desc = req.body.EVENTDESC;
  var url = req.body.URL;

  var sql =
    "UPDATE events SET EVENTTITLE = ?, STARTDATE = ?, LOC = ?, IMAGE = ?, EVENTDESC = ?, URL = ? WHERE EVENTID = ?";
  con.query(
    sql,
    [title, sdate, loc, image, desc, url, eid],
    function (err, result) {
      if (err) throw err;
      console.log("Event updated");
      res.send("Event updated successfully");
    }
  );
});

// Get events
app.get("/getevents", function (req, res) {
  var sql = "SELECT * FROM events";
  con.query(sql, function (err, result) {
    if (err) throw err;

    var events = result.map((event) => ({
      title: event.EVENTTITLE,
      start: event.STARTDATE,
      description: event.EVENTDESC,
      location: event.LOC,
      imageUrl: `data:image/jpeg;base64,${event.IMAGE.toString("base64")}`, // Use base64 if storing binary data
      url: event.URL,
    }));

    res.json(events);
  });
});

app.listen(3001, function () {
  console.log("Server is running on port 3001");
});
