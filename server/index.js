const express = require("express");
const classifyRoutes = require("./routes/classifyRoutes");
const productRoutes = require('./routes/productRoutes');

const connectDB = require('./db/connection');
const cors=require('cors');
const app = express();
app.use(cors())
const port = 3000;

// Middleware
app.use(express.json());
connectDB();
// Routes
app.use("/api", classifyRoutes);
app.use("/api1",productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
