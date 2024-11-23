const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3001;

// Set the base path for static files
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/2024", express.static(path.join(__dirname, "previous")));

// Handle requests to specific pages under the `/2024` path
app.get("/:page", (req, res, next) => {
  const fileName = path.join(__dirname, "public", `${req.params.page}.html`);
  res.sendFile(fileName, (err) => {
    if (err) {
      next(); // Move to the next middleware if the file is not found
    }
  });
});
app.get("/2024/:page", (req, res, next) => {
  const fileName = path.join(__dirname, "previous", `${req.params.page}.html`);
  res.sendFile(fileName, (err) => {
    if (err) {
      next(); // Move to the next middleware if the file is not found
    }
  });
});

// Fallback route to `index.html` when a page is not found in `/2024`
app.get("/", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/2024", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "previous", "index.html"));
});

// Handle 404 errors specifically for `/2024` routes
app.use("/", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.use("/2024", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "previous", "404.html"));
});

app.listen(PORT, () => {
  console.log(`APP RUNNING ON ${PORT}`);
});
