const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Set up storage location and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to store uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000 * 1024 * 1024 }, // limit to ~1GB
});

// POST /api/upload
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    message: "File uploaded successfully",
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
  });
});
router.get("/:filename", (req, res) => {
    const { filename } = req.params;
  
    // Define the path to the uploaded files
    const filePath = path.join(__dirname, "../uploads", filename);
  
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // If the file exists, send it to the client
      res.download(filePath, filename, (err) => {
        if (err) {
          console.error("Error downloading file:", err);
          res.status(500).json({ message: "Error downloading file" });
        }
      });
    } else {
      // If the file doesn't exist, return a 404 error
      res.status(404).json({ message: "File not found" });
    }
  });
  router.get("/", (req, res) => {
    // Read the "uploads" directory
    fs.readdir(path.join(__dirname, "../uploads"), (err, files) => {
      if (err) {
        return res.status(500).json({ message: "Error reading files", error: err });
      }
      res.status(200).json(files); // Send the list of filenames
    });
  });
  router.get("/files", (req, res) => {
    const uploadsDir = path.join(__dirname, "../uploads");
  
    // Read the "uploads" directory
    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        return res.status(500).json({ message: "Error reading files", error: err });
      }
      res.status(200).json(files); // Send the list of filenames
    });
  });

module.exports = router;
