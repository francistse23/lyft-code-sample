const express = require("express");

const app = express().use(express.json());

// helper function to process string
// that returns every 3rd letter from the original string
function stringProcessor(str) {
  let moddedString = "";

  // we can add a regular express to remove all the spaces
  // if we want it to return alphanumeric characters only

  if (typeof str !== "string") str = String(str);

  // start the loop from the first 3rd letter
  // then increment by 3 to get the next 3rd letter
  for (let i = 2; i < str.length; i += 3) {
    moddedString += str[i];
  }

  return moddedString;
}

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ msg: "Server is up and running" });
  } catch (err) {
    const { message, stack } = err;
    res.status(500).json({ error: { msg: message, stack } });
  }
});

app.post("/test", async ({ body }, res) => {
  try {
    if (typeof body !== "object")
      res.status(400).json({
        error: "Invalid Request",
        msg: "Please make sure the data provided is an object { key: value } ",
      });
    // if the body has more than 1 argument, return error 400
    if (!Object.keys(body).length || Object.keys(body).length > 1)
      res.status(400).json({
        error: "Invalid Request",
        msg: !Object.keys(body).length
          ? "\nRequest body is empty. Please provide data to the request body -> { string_to_cut: {some string} }"
          : "\nMore than 1 key has been provided. Please make sure the data only contains the 'string_to_cut' key -> { string_to_cut: {some string} }",
      });

    // if it doesnt contain the key string to cut, return some msg 400
    if (!body.hasOwnProperty("string_to_cut"))
      res
        .status(400)
        .json({
          error: "Invalid Request",
          msg: "\nRequest body is missing the key 'string_to_cut'.",
        });

    // if the value is empty or less than 3 characters, return empty string/some msg? 204 ?
    if (typeof Object.values(body)[0] === "object")
      res.status(400).json({
        error: "Invalid Request",
        msg: `The value has to be a string. Instead, type ${typeof Object.values(
          body
        )[0]} was received.`,
      });

    if (Object.values(body)[0].length < 3) {
      res.send(204).json({ return_string: "" });
    } else {
      res
        .status(200)
        .json({ return_string: stringProcessor(Object.values(body)[0]) });
    }
  } catch (error) {
    res.status(500);
  }
});

// to handle invalid routes
app.use((req, res) =>
  res.status(404).json({ error: "Route does not exist", msg: "Invalid input" })
);

app.listen(process.env.PORT || 9000, (error) => {
  if (error) throw new Error(error);

  console.log(`Server running on port ${process.env.PORT || 9000}`);
});
