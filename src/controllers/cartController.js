const db = require('../models/db');

module.exports.show = async (req, res) => {
    try {
        const ipAddress = req.ip;

        const query = `
            SELECT 
                c.id AS cart_id, 
                c.qty AS quantity, 
                p.product_id, 
                p.product_title, 
                p.product_price, 
                p.product_image, 
                (c.qty * p.product_price) AS total_price
            FROM 
                cart c
            JOIN 
                products p ON c.p_id = p.product_id
            WHERE 
                c.ip_add = $1
        `;
        const cartItems = await db.query(query, [ipAddress]);
        const totalAmount = cartItems.rows.reduce((sum, item) => sum + item.total_price, 0);

        res.render('cart', {
            title: 'Your Cart',
            cartItems: cartItems.rows,
            totalAmount,
        });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.updateQuantity = async (req, res) => {
    try {
        const { cart_id, quantity } = req.body;

        if (quantity <= 0) {
            return res.redirect(`/cart/delete?cart_id=${cart_id}`);
        }

        const query = `
            UPDATE cart 
            SET qty = $1 
            WHERE id = $2
        `;
        await db.query(query, [quantity, cart_id]);
        res.redirect('/cart');
    } catch (error) {
        console.error("Error updating quantity:", error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        const { cart_id } = req.body;

        const query = `
            DELETE FROM cart 
            WHERE id = $1
        `;
        await db.query(query, [cart_id]);
        res.redirect('/cart');
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send('Internal Server Error');
    }
};











module.exports.showCheckout = async (req, res) => {
    try {
        // Xác định địa chỉ IP
        const ipAddress = req.ip;

        // Truy vấn cơ sở dữ liệu để lấy thông tin chi tiết giỏ hàng
        const query = `
            SELECT 
                c.id AS cart_id, 
                c.qty AS quantity, 
                p.product_id, 
                p.product_title, 
                p.product_price, 
                p.product_image, 
                (c.qty * p.product_price) AS total_price
            FROM 
                cart c
            JOIN 
                products p ON c.p_id = p.product_id
            WHERE 
                c.ip_add = $1
        `;

        // Lấy dữ liệu giỏ hàng từ cơ sở dữ liệu
        const cartItems = await db.query(query, [ipAddress]);

        // Tính tổng số lượng sản phẩm và tổng tiền
        const prod_count = cartItems.rows.reduce((sum, item) => sum + item.quantity, 0);
        const total_amt = cartItems.rows.reduce((sum, item) => sum + item.total_price, 0);

        // Ghi log để kiểm tra
        console.log("Checkout Data:", {
            prod_count,
            total_amt
        });

        // Truyền dữ liệu tới giao diện checkout
        res.render('checkout', {
            title: 'Checkout',
            prod_count, // Tổng số lượng sản phẩm
            totalAmount: total_amt // Tổng số tiền
        });
    } catch (error) {
        // Xử lý lỗi
        console.error('Error fetching checkout data:', error);
        res.status(500).send('Internal Server Error');
    }
};

// cartController.js
module.exports.showThankYouPage = async (req, res) => {
    try {
        // Render trang cảm ơn mà không có title hay bất kỳ tham số nào
        res.render('thankyou');  // Chỉ render trang thankyou
    } catch (error) {
        console.error("Error rendering thank you page:", error);
        res.status(500).send('Internal Server Error');
    }
};


