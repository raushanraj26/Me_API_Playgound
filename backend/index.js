const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


//post endpoint to test JSON body parsing
app.post("/test", (req, res) => {
  res.json({
    message: "Data received",
    data: req.body
  });
});








const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
