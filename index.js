const express = require("express");

const app = express().use(express.json());

app.get("/", async (req, res) => {
  try {
    // console.log(req);
    res.status(200).send("Hello world");
  } catch (err) {
    throw new Error(err, "Server is not working");
  }
});

app.listen(process.env.PORT || 9000, (error) => {
  if (error) throw new Error(error);

  console.log(`Server running on port ${process.env.PORT || 9000}`);
});
