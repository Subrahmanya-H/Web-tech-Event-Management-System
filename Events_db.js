var mysql = require("mysql");
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected");

  con.query(
    "CREATE DATABASE IF NOT EXISTS Event_Management_System",
    function (err, result) {
      if (err) throw err;
      console.log("Database created");

      con.changeUser({ database: "Event_Management_System" }, function (err) {
        if (err) throw err;
        console.log("Database changed");

        // Create Events table
        let emstab = `CREATE TABLE IF NOT EXISTS Events (
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
          console.log("Events table created");

          // Create Users table
          let usersTable = `CREATE TABLE IF NOT EXISTS Users (
            userID INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
          )`;
          con.query(usersTable, function (err, result) {
            if (err) throw err;
            console.log("Users table created");
          });
        });
      });
    }
  );
});
