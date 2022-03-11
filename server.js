const books = require("./db.json");
var fs = require("fs");
let { v4 } = require("uuid");
const { randomUUID } = require("crypto");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
var l1 = () => {
  readline.question(`Press 1, 2 or 3`, (num) => {
    if (num === "1") {
      console.log(books);
      l1();
    } else if (num === "2") {
      readline.question(`Enter book name`, (book) => {
        var data = fs.readFileSync("db.json");
        var json = JSON.parse(data);
        console.log(json["books"]);
        json["books"].push({ id: v4(), title: `${book}` });
        console.log(json);
        var newData2 = JSON.stringify(json);
        fs.writeFile("db.json", newData2, (err) => {
          if (err) throw err;

          console.log("BOOK ADDED SUCCESSFULLY!!!!");
        });
      });
    } else if (num === "3") {
      readline.question(
        "Are you sure you want to quit - press Y to quit",
        (y) => {
          if (y === "y") {
            console.log("Bye Bye!!!!");
            readline.close();
          } else {
            l1();
          }
        }
      );
    } else {
      console.log(
        "You have selected an invalid entry so please press 1, 2 or 3!!!!!"
      );
      l1();
    }
  });
};
l1();
