const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const db = require('../models/db')
const { authenticator_for_checkout } = require("../middleware/authMiddleware"); // Đảm bảo import đúng middleware

router.get("/", cartController.show);
router.post("/update", cartController.updateQuantity);
router.post("/delete", cartController.deleteProduct);

router.get("/checkout", authenticator_for_checkout, cartController.showCheckout);
// Định nghĩa route xử lý POST yêu cầu Cash On Delivery (COD)
// Định nghĩa route GET cho /cart/checkout/cod
router.get('/checkout/cod', cartController.showThankYouPage);

// Định nghĩa route cho MoMo Bank (nếu cần)
router.get('/checkout/momo', cartController.showThankYouPage);
module.exports = router;