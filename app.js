const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Import routes
const userRoutes = require('./routes/user');

app.use('/api/user', userRoutes);

// Connect to database
mongoose.connect('mongodb://localhost/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`REST API listening on port ${PORT}`);
});