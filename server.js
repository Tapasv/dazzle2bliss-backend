require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://dazzle2bliss-frontend.vercel.app',
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/stats', require('./routes/stats'));

app.get('/', (req, res) => res.send('Dazzle2Bliss API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));