const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper function to spawn Python scripts
const callPythonScript = (scriptPath, inputData, res) => {
  const pythonExecutable = "C:\\Python312\\python.exe"; // Update with your Python path
  const pythonProcess = spawn(pythonExecutable, [scriptPath]);

  pythonProcess.stdin.write(JSON.stringify(inputData));
  pythonProcess.stdin.end();

  let result = "";
  let errorOccurred = false;

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python Output: ${data.toString()}`);
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python Error: ${data.toString()}`);
    errorOccurred = true;
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
    if (!errorOccurred && code === 0) {
      try {
        const parsedResult = JSON.parse(result);
        res.status(200).json(parsedResult);
      } catch (err) {
        console.error(`Error parsing Python response: ${err}`);
        res.status(500).json({
          message: "Error parsing Python response.",
        });
      }
    } else {
      res.status(500).json({
        message: errorOccurred
          ? "Python script error occurred."
          : "Error executing Python function.",
      });
    }
  });
};

// Endpoint to handle bookings
app.post("/api/book", (req, res) => {
  const bookingData = req.body;

  // Path to the booking calendar Python script
  const pythonScriptPath = path.join(__dirname, "booking_calendar.py");

  callPythonScript(pythonScriptPath, bookingData, res);
});

// User-specific calendar booking endpoint
app.post("/api/:uniqueId/book", (req, res) => {
  const { uniqueId } = req.params;
  const bookingData = req.body;

  if (!uniqueId) {
    return res
      .status(400)
      .json({ message: "Unique ID is required in the URL." });
  }

  // Path to the booking calendar Python script
  const pythonScriptPath = path.join(__dirname, "booking_calendar.py");

  // Add uniqueId to the booking data
  const inputData = { ...bookingData, uniqueId };

  callPythonScript(pythonScriptPath, inputData, res);
});

// Endpoint to generate API key for user
app.post("/api/generate_api_key", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    // Generate a unique API key
    const apiKey = require("crypto").randomBytes(16).toString("hex");

    // Path to the Python script to save the API key
    const pythonScriptPath = path.join(__dirname, "user_creation.py");

    // Include the action parameter for the Python script
    const pythonProcess = spawn("C:\\Python312\\python.exe", [
      pythonScriptPath,
      "generate_api_key",
    ]);

    // Send input data to the Python script
    const inputData = { userId, apiKey };
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();

    let result = "";
    let errorOccurred = false;

    // Handle Python script output
    pythonProcess.stdout.on("data", (data) => {
      console.log(`Python Output: ${data.toString()}`);
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python Error: ${data.toString()}`);
      errorOccurred = true;
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
      if (!errorOccurred && code === 0) {
        try {
          const parsedResult = JSON.parse(result);
          res.status(200).json(parsedResult);
        } catch (err) {
          console.error(`Error parsing Python response: ${err}`);
          res.status(500).json({
            message: "Error parsing Python response.",
          });
        }
      } else {
        res.status(500).json({
          message: errorOccurred
            ? "Python script error occurred."
            : "Error generating API key.",
        });
      }
    });
  } catch (error) {
    console.error("Error generating API key:", error);
    res.status(500).json({ message: "Error generating API key." });
  }
});

// **New Endpoint to retrieve the user's API key**
// Endpoint to fetch API key for a user
app.get("/api/get_api_key/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    // Path to the Python script to fetch the API key
    const pythonScriptPath = path.join(__dirname, "user_creation.py");

    // Spawn the Python process to handle the fetch
    const pythonProcess = spawn("C:\\Python312\\python.exe", [
      pythonScriptPath,
      "get_api_key",
    ]);

    // Send input data to the Python script
    const inputData = { userId };
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();

    let result = "";
    let errorOccurred = false;

    pythonProcess.stdout.on("data", (data) => {
      console.log(`Python Output: ${data.toString()}`);
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python Error: ${data.toString()}`);
      errorOccurred = true;
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
      if (!errorOccurred && code === 0) {
        try {
          const parsedResult = JSON.parse(result);
          res.status(200).json(parsedResult);
        } catch (err) {
          console.error(`Error parsing Python response: ${err}`);
          res.status(500).json({
            message: "Error parsing Python response.",
          });
        }
      } else {
        res.status(500).json({
          message: errorOccurred
            ? "Python script error occurred."
            : "Error fetching API key.",
        });
      }
    });
  } catch (error) {
    console.error("Error fetching API key:", error);
    res.status(500).json({ message: "Error fetching API key." });
  }
});

// Endpoint to create a user
app.post("/api/create_user", (req, res) => {
  const userData = req.body;

  // Path to the user creation Python script
  const pythonScriptPath = path.join(__dirname, "user_creation.py");

  const pythonProcess = spawn("C:\\Python312\\python.exe", [
    pythonScriptPath,
    "create_user",
  ]);

  pythonProcess.stdin.write(JSON.stringify(userData));
  pythonProcess.stdin.end();

  let result = "";
  let errorOccurred = false;

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python Output: ${data.toString()}`);
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python Error: ${data.toString()}`);
    errorOccurred = true;
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
    if (!errorOccurred && code === 0) {
      try {
        const parsedResult = JSON.parse(result);
        res.status(200).json(parsedResult);
      } catch (err) {
        console.error(`Error parsing Python response: ${err}`);
        res.status(500).json({
          message: "Error parsing Python response.",
        });
      }
    } else {
      res.status(500).json({
        message: errorOccurred
          ? "Python script error occurred."
          : "Error creating user.",
      });
    }
  });
});

// Endpoint for user sign-in
app.post("/api/sign_in", (req, res) => {
  const loginData = req.body;

  // Path to the user creation Python script
  const pythonScriptPath = path.join(__dirname, "user_creation.py");

  const pythonProcess = spawn("C:\\Python312\\python.exe", [
    pythonScriptPath,
    "sign_in",
  ]);

  pythonProcess.stdin.write(JSON.stringify(loginData));
  pythonProcess.stdin.end();

  let result = "";
  let errorOccurred = false;

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python Output: ${data.toString()}`);
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python Error: ${data.toString()}`);
    errorOccurred = true;
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
    if (!errorOccurred && code === 0) {
      try {
        const parsedResult = JSON.parse(result);
        res.status(200).json(parsedResult);
      } catch (err) {
        console.error(`Error parsing Python response: ${err}`);
        res.status(500).json({
          message: "Error parsing Python response.",
        });
      }
    } else {
      res.status(500).json({
        message: errorOccurred
          ? "Python script error occurred."
          : "Error during sign-in.",
      });
    }
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
