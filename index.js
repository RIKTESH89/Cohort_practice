// Request method:
// GET : Ask
// POST : Insert/Write
// PUT : Replace
// DELETE : remove

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

var users = [
  {
    name: "harkirat",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.get("/", function (req, res) {
  let n = users.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    let kidney = users[i].kidneys;
    // console.log(kidney);
    let l = kidney.length;
    for (let j = 0; j < l; j++) {
      if (kidney[j]["healthy"] == false) {
        ans = ans + 1;
      }
    }
  }
  res.json({
    ans,
  });
});

app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0]["kidneys"].push({ healthy: isHealthy });
  res.json(users);
});

app.put("/", function (req, res) {
  let n = users.length;
  for (let i = 0; i < n; i++) {
    let kidney = users[i].kidneys;
    let l = kidney.length;
    for (let j = 0; j < l; j++) {
      if (kidney[j]["healthy"] == false) {
        kidney[j]["healthy"] = true;
      }
    }
  }
  res.json({
    Removed: "Succesfully",
  });
});

app.delete("/", function (req, res) {
  // let newarray=[];
  let n = users.length;
  for (let i = 0; i < n; i++) {
    let kidney_array = [];
    let kidney = users[i].kidneys;
    let l = kidney.length;
    for (let j = 0; j < l; j++) {
      if (kidney[j]["healthy"] == true) {
        kidney_array.push({ healthy: true });
      }
    }
    users[i].kidneys = kidney_array;
  }
  res.json({
    Operation: "Succesfully",
  });
});

app.listen(3000);
