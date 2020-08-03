const express = require("express");

const app = express().use(express.json());

// helper function to process string
// that returns every 3rd letter from the original string
function stringProcessor(str) {
  let moddedString = "";

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
    // if the body has more than 1 argument, return error 400
    if (!Object.keys(body).length || Object.keys(body).length > 1)
      res
        .status(400)
        .send(
          !Object.keys(body).length
            ? "\nRequest body is empty. Please provide data to the request body -> { string_to_cut: {some string} }"
            : "\nMore than 1 key has been provided. Please make sure the data only contains the 'string_to_cut' key -> { string_to_cut: {some string} }"
        );

    // if it doesnt contain the key string to cut, return some msg 400
    if (!body.hasOwnProperty("string_to_cut"))
      res
        .status(400)
        .send("\nRequest body is missing the key 'string_to_cut'.");

    // if the value is empty or less than 3 characters, return empty string/some msg? 204 ?
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
  res.status(404).send("\nInvalid route name. Please check your input")
);

app.listen(process.env.PORT || 9000, (error) => {
  if (error) throw new Error(error);

  console.log(`Server running on port ${process.env.PORT || 9000}`);
});
