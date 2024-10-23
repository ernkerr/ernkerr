const express = require("express"); // import express
const app = express(); // create an app instance
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

// create route for backend api
app.get("/api", (req, res) => {
  // send data here
  res.json({ fruits: ["apple", "orange", "banana"] });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
