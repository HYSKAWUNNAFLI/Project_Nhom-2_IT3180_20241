const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.show);
router.post("/update", cartController.updateQuantity);
router.post("/delete", cartController.deleteProduct);
router.get('/count', async (req, res) => {
    try {
        let ipAddress = req.ip;

        // Chuẩn hóa địa chỉ IP
        if (ipAddress === '::1') {
            ipAddress = '127.0.0.1';
        }

        // Truy vấn tổng số lượng sản phẩm trong giỏ
        const query = `
            SELECT COUNT(id) AS total_items 
            FROM cart 
            WHERE ip_add = $1
        `;
        const result = await db.query(query, [ipAddress]);

        // Trả về số lượng sản phẩm
        res.json({ totalItems: result.rows[0].total_items || 0 });
    } catch (error) {
        console.error('Error fetching cart count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/checkout', cartController.showCheckout);
// Định nghĩa route xử lý POST yêu cầu Cash On Delivery (COD)
// Định nghĩa route GET cho /cart/checkout/cod
router.get('/checkout/cod', cartController.showThankYouPage);

// Định nghĩa route cho MoMo Bank (nếu cần)
router.get('/checkout/momo', cartController.showThankYouPage);
module.exports = router;