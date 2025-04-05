//v2
// const model = require("../models/teachableModel");
// const watch=require('../../dataset/WRISTWATCH')
// // Controller to classify an image
// const classifyImage = async (req, res) => {
//   try {
//     const { imageUrl } = watch+req.body;
//     // const { imageUrl } = req.body;

//     if (!imageUrl) {
//       return res.status(400).json({ error: "Image URL is required." });
//     }

//     // Call the Teachable Machine model to classify the image
//     const predictions = await model.classify({ imageUrl });

//     // Return predictions as response
//     res.status(200).json({
//       message: "Image classified successfully",
//       predictions,
//     });
//   } catch (error) {
//     console.error("Error in classifyImage:", error);
//     res.status(500).json({ error: "Failed to classify the image" });
//   }
// };

// module.exports = {
//   classifyImage,
// };
//v3
// const multer = require("multer");
// const TeachableMachine = require("@sashido/teachablemachine-node");

// // Configure multer to handle file uploads
// const upload = multer({ storage: multer.memoryStorage() });

// const model = new TeachableMachine({
//   modelUrl: "https://teachablemachine.withgoogle.com/models/uqVLUR7K7/"
// });

// // Handle image upload and classification
// exports.classifyImage = [
//   upload.single("image"), // Middleware to handle single file upload
//   async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: "No image file uploaded." });
//       }

//       console.log("File details:", req.file);
//       // Convert the uploaded file buffer to a Base64-encoded string
//       const imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
//       // console.log("req.file.mimetype",req.file.mimetype,"imageBase64",imageBase64);
//       // Use the Teachable Machine model to classify the image
//       // Validate the imageBase64 structure
//       if (!imageBase64.startsWith("data:image/")) {
//         return res.status(400).json({ message: "Invalid image format." });
//       }
//       const predictions = await model.classify({
//         image: imageBase64,
//       });
//       console.log("predictions",predictions)
//       return res.status(200).json(predictions);
//     } catch (error) {
//       console.error("Error classifying image:", error);
//       return res.status(500).json({ message: "Error processing the image." });
//     }
//   },
// ];

//v4
const multer = require("multer");
const TeachableMachine = require("@sashido/teachablemachine-node");
// const model =require('../models/teachableModel');
// Configure multer to handle file uploads
const upload = multer({ storage: multer.memoryStorage() });

const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/uqVLUR7K7/",
});

// Handle image upload and classification
exports.classifyImage = [
  upload.single("image"), // Middleware to handle single file upload
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file uploaded." });
      }

      console.log("File details:", req.file);

      // Convert the uploaded file buffer to a Base64-encoded string
      const imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      console.log('1')
      // Validate the Base64 format
      if (!req.file.mimetype.startsWith("image/")) {
        console.log('2')
        console.error("Invalid MIME type:", req.file.mimetype);
        return res.status(400).json({ message: "Uploaded file is not an image." });
        console.log('2')
      }
      
      console.log('3')
      console.log("Valid Base64 Encoded Image:", imageBase64.slice(0, 50)); // Log first 50 characters
      
      // Use the Teachable Machine model to classify the image
      const predictions = await model.classify({
        imageUrl: imageBase64,
      });
      console.log('4')
      
      console.log("Predictions:", predictions);
      return res.status(200).json(predictions);
    } catch (error) {
      console.log('5')
      console.error("Error classifying image:", error.message || error);
      return res.status(500).json({ message: "Error processing the image." });
    }
  },
];
