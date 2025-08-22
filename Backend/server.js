const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const connectDB = require('./config/connection');
const middleware = require('./middleware/auth');
const configRoutes = require('./routes/configRoutes');
const signageTypeRoutes = require('./routes/signageTypeRoutes');

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:8080', 'https://acrylicsignboards.in/', 'https://acrylicsignboards-admin.netlify.app/'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to DB before starting server
connectDB();
console.log("db connected");


// ✅ Add this before your routes
// app.use(express.json()); // Parses JSON body
app.use('/api/enquiry', middleware, require('./routes/sendenquiry'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/auth', require('./routes/auth'));
app.use('/fonts', express.static(path.join(__dirname, 'fonts'), {
    setHeaders: (res, path) => {
    if (path.endsWith('.ttf')) {
      res.setHeader('Content-Type', 'font/ttf');
    }
    if (path.endsWith('.otf')) {
      res.setHeader('Content-Type', 'font/otf');
    }
    if (path.endsWith('.woff')) {
      res.setHeader('Content-Type', 'font/woff');
    }
    if (path.endsWith('.woff2')) {
      res.setHeader('Content-Type', 'font/woff2');
    }
  }
}));
app.use("/api/font-files", require("./routes/fontRoutes")); // mount it
app.use('/api', configRoutes);
app.use('/api/signage-types', signageTypeRoutes);

// Serve static files from images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Sample route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
