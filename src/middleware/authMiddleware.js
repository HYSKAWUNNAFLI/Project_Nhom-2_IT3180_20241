const jwt = require('jsonwebtoken'); // JSON Web Token for authentication
const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

// Middleware: Authenticator
const authenticator = (req, res, next) => {
    const token = req.cookies?.auth_token; // Safely access auth_token from cookies

    if (!token) {
        return res.redirect('/'); // Redirect to the login page if no token is found
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verify the token
        req.user = decoded; // Attach the decoded user info to the request object
        next(); // Move to the next middleware/controller
    } catch (error) {
        console.error("Authentication error:", error);
        res.redirect('/'); // Redirect to login if token is invalid
    }
};

// Middleware: Authorize (specific role or user-based permissions)
const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this resource" });
        }
        next();
    };
};

// Middleware: Attach user to res.locals (useful for rendering views)
const attachUserToLocals = (req, res, next) => {
    res.locals.user = req.session?.user || null; // Attach user from session to res.locals
    next();
};

const authenticator_for_checkout = (req, res, next) => {
    const token = req.cookies?.auth_token || req.session?.user;

    if (!token) {
        return res.redirect('/account'); // Chuyển hướng đến trang đăng nhập
    }

    try {
        if (req.cookies?.auth_token) {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded; // Gắn thông tin người dùng vào req
        } else {
            req.user = req.session.user; // Lấy thông tin từ session
        }
        next(); // Cho phép tiếp tục nếu đã đăng nhập
    } catch (error) {
        console.error("Authentication error:", error);
        res.redirect('/account');
    }
};
// Export all middlewares
module.exports = {
    authenticator,
    authorize,
    attachUserToLocals,
    authenticator_for_checkout,
};
