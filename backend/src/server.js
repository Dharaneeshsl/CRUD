const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/crud-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/items', require('./routes/items'));

// Basic route
app.get('/', (req, res) => {
  res.send('CRUD API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
