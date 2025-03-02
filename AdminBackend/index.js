const express = require('express');
const { connectDB } = require('./config/ConnectDb');
const adminRouter = require('./routes/admin.routes');
const cors = require('cors');

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Routes
app.use('/admin', adminRouter); // User routes





// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Backend');
});



// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
