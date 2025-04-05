// //v2
// const express = require("express");
// const { classifyImage } = require("../controllers/classifyController");

// const router = express.Router();

// // Route to classify an image
// router.post("/classify", classifyImage);

// module.exports = router;

//v3
const express = require("express");
const { classifyImage } = require("../controllers/classifyController");

const router = express.Router();

// POST endpoint for classifying an uploaded image
router.post("/classify", classifyImage);

module.exports = router;
