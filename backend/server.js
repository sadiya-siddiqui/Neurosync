const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      text: req.body.text
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error connecting to AI");
  }
});

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});