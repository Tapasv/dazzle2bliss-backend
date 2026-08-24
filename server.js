require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

// Normalize: trim whitespace, strip trailing slashes, drop empties/dupes
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://dazzle2bliss-frontend.vercel.app',
  'http://localhost:5173'
]
  .filter(Boolean)
  .map((o) => o.trim().replace(/\/+$/, ''));

console.log('CORS allowed origins:', allowedOrigins);

const corsOptions = {
  origin(origin, callback) {
    // Allow no-origin requests (curl, server-to-server, mobile apps)
    if (!origin) return callback(null, true);

    const normalized = origin.replace(/\/+$/, '');

    if (allowedOrigins.includes(normalized)) {
      return callback(null, true);
    }

    console.warn('Blocked by CORS:', origin);
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true
};

app.use(cors(corsOptions));
// Ensure preflight (OPTIONS) requests are handled for every route
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/stats', require('./routes/stats'));

app.get('/', (req, res) => res.send('Dazzle2Bliss API is running'));

// Make sure CORS errors return JSON instead of an unhandled crash
// (an uncaught error here can also look like "CORS blocked" in the browser,
// because the connection drops before headers are sent)
app.use((err, req, res, next) => {
  if (err && err.message && err.message.includes('not allowed by CORS')) {
    return res.status(403).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));