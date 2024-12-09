// Import required modules
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');

// Configure Handlebars as the view engine
app.engine(
  'handlebars',
  engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts'), // Thư mục layout
    defaultLayout: 'main', // Layout mặc định
    partialsDir: path.join(__dirname, 'views', 'partials'), // Thư mục partials
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Đặt thành true nếu sử dụng HTTPS
}));


// Static folder for assets (e.g., CSS, images, JS files)
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
const db = require('./models/db');
db.connect();


// Import middleware for cart item count
const { getCartItemCount } = require('./controllers/cartController');

// Use middleware for cart item count (global middleware)
app.use(getCartItemCount);

// Import and use routes
// Import authentication middleware
const { authenticator } = require('./middleware/authMiddleware');
const { attachUserToLocals } = require('./middleware/authMiddleware');
app.use(attachUserToLocals);

// Routes

const productRouters = require('./routes/productRouters');
app.use('/product', productRouters);

const defaultRouters = require('./routes/defaultRouters');
app.use('/', defaultRouters);

const cartRouters = require('./routes/cartRouters');
app.use('/cart', cartRouters);

const usersRouters = require('./routes/usersRouters');
app.use('/account', usersRouters);


const viewdetailRouters = require('./routes/viewdetailRouters');
app.use('/viewdetail', viewdetailRouters);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// Protected route example (requires authentication)
app.get('/payment/success', authenticator, (req, res) => {
  res.render('success.handlebars', { title: "Payment Successful" });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
