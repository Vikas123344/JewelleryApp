//v2
const TeachableMachine = require("@sashido/teachablemachine-node");

// Load the Teachable Machine model
const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/uqVLUR7K7/"
//   modelUrl: "https://teachablemachine.withgoogle.com/models/YOUR_MODEL_URL/"
});

module.exports = model;


