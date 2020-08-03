const express = require("express");

const app = express().use(express.json());

app.get("/", async (req, res) => {
  try {
    res.status(200).send("Server is up and running");
  } catch (error) {
    res.status(500).send({ error });
  }
});

// to handle invalid routes
app.use((req, res) =>
  res.status(404).send("Invalid route name. Please check your input")
);

app.listen(process.env.PORT || 9000, (error) => {
  if (error) throw new Error(error);

  console.log(`Server running on port ${process.env.PORT || 9000}`);
});
