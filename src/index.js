// Import required modules
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const { fileURLToPath } = require('url');
const fs = require('fs');
const { authenticator } = require('./middleware/authMiddleware');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configure Handlebars as the view engine
app.engine(
  'handlebars',
  engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts'), // Directory for layouts
    defaultLayout: 'main', // Default layout
    partialsDir: path.join(__dirname, 'views', 'partials'), // Directory for partials
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }, // Use secure cookies in production
  })
);



// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the database
const db = require('./models/db');
db.connect();

const productRouters = require('./routes/productRouters');
app.use('/product', productRouters);

const defaultRouters = require('./routes/defaultRouters');
app.use('/', defaultRouters);

const cartRouters = require('./routes/cartRouters');
app.use('/cart', cartRouters);

const usersRouters = require('./routes/usersRouters');
app.use('/account', usersRouters);

const searchRouters = require('./routes/searchRouters');
app.use('/search', searchRouters);

const viewdetailRouters = require('./routes/viewdetailRouters');
app.use('/viewdetail', viewdetailRouters);

// Protected route example (requires authentication)
app.get('/payment/success', authenticator, (req, res) => {
  res.render('success.handlebars', { title: 'Payment Successful' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// 404 handling middleware
app.use((req, res) => {
  res.status(404).render('404.handlebars', { title: 'Page Not Found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});