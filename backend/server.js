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

// Endpoint to create a user
app.post("/api/create_user", (req, res) => {
  const userData = req.body;

  // Path to the user creation Python script
  const pythonScriptPath = path.join(__dirname, "user_creation.py");

  // Spawn a Python process for user creation
  const pythonProcess = spawn("C:\\Python312\\python.exe", [pythonScriptPath, "create_user"]);

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

  // Spawn a Python process for sign-in
  const pythonProcess = spawn("C:\\Python312\\python.exe", [pythonScriptPath, "sign_in"]);

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
