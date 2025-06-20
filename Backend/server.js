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
app.use(cors());
app.use(express.json());


// Connect to DB before starting server
connectDB();
console.log("db connected");

// app.use('/api/colors', middleware, require('./routes/price/color'));
// app.use('/api/sizes', middleware, require('./routes/price/size'));
// app.use('/api/types', middleware, require('./routes/price/type'));
// app.use('/api/fonts', middleware, require('./routes/price/font'));
app.use('/api/enquiry', middleware, require('./routes/sendenquiry'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api', configRoutes);
app.use('/api/signage-types', signageTypeRoutes);

// Serve static files from images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Sample route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Your routes go here...

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
