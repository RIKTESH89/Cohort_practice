const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());

app.get("/sum", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const c = parseInt(req.query.c);
  let ans = a + (a * b * c) / 100;
  let interst = ans - a;
  res.json({
    final: ans,
    profit: interst,
  });
});

app.listen(3000);
