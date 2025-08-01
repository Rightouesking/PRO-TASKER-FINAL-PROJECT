const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config(); // Load .env variables
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json()); // Parse JSON bodies

app.use('/api/users', userRoutes); // Register user routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
