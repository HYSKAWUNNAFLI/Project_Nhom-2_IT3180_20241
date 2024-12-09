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









module.exports.getCartItemCount = async (req, res, next) => {
    try {
        let ipAddress = req.ip === '::1' ? '127.0.0.1' : req.ip;

        const query = `
            SELECT COUNT(id) AS total_items 
            FROM cart 
            WHERE ip_add = $1
        `;
        const result = await db.query(query, [ipAddress]);

        res.locals.cartItemCount = result.rows[0].total_items || 0; // Đảm bảo chỉ truyền `cartItemCount`
        next();
    } catch (error) {
        console.error('Error fetching cart item count:', error);
        res.locals.cartItemCount = 0;
        next();
    }
};


module.exports.showCheckout = async (req, res) => {
    try {
        const ipAddress = req.ip === '::1' ? '127.0.0.1' : req.ip;

        const query = `
            SELECT 
                SUM(c.qty) AS prod_count,
                SUM(p.product_price * c.qty) AS total_amt
            FROM cart c
            JOIN products p ON c.p_id = p.product_id
            WHERE c.ip_add = $1
        `;

        const result = await db.query(query, [ipAddress]);

        console.log("Data from DB:", result.rows); // Log toàn bộ kết quả

        const prod_count = result.rows[0].prod_count || 0;
        const total_amt = result.rows[0].total_amt || 0;

        console.log("Product Count:", prod_count); // Log thêm từng giá trị
        console.log("Total Amount:", total_amt);

        res.render('checkout', {
            title: 'Checkout',
            prod_count,
            totalAmount: total_amt,
        });
    } catch (error) {
        console.error('Error fetching cart summary:', error);
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


