const express = require("express");
const path = require("path");

const app = express();

// Serve static files from both folders
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../previous")));

// Dynamic route for pages
app.get("/:page", (req, res, next) => {
  const publicFile = path.join(
    __dirname,
    "../public",
    `${req.params.page}.html`
  );
  const previousFile = path.join(
    __dirname,
    "../previous",
    `${req.params.page}.html`
  );

  // Check the public folder first
  res.sendFile(publicFile, (err) => {
    if (err) {
      // If not in public, check the previous folder
      res.sendFile(previousFile, (errPrevious) => {
        if (errPrevious) {
          next(); // Proceed to 404 if not found
        }
      });
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../public", "404.html"));
});

module.exports = app;
