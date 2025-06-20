const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')
require('dotenv').config();

const contactRoute = require('./routes/contact');

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // ✅ this is correct
app.use(bodyParser.json());

app.use('/api/contact', contactRoute);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
