const db = require('../models/db');

// Lấy thông tin chi tiết sản phẩm và các sản phẩm liên quan
const getProductDetails = async (req, res) => {
    try {
        const productId = req.params.product_id;

        // Truy vấn thông tin sản phẩm
        const productQuery = `
            SELECT * FROM products
            WHERE product_id = $1
        `;
        const productResult = await db.query(productQuery, [productId]);

        // Nếu không tìm thấy sản phẩm
        if (productResult.rows.length === 0) {
            return res.status(404).render('404', { message: 'Product not found!' });
        }

        const product = productResult.rows[0];

        // Truy vấn các sản phẩm liên quan
        const relatedProductsQuery = `
            SELECT * FROM products
            WHERE product_brand = $1 AND product_id != $2
            LIMIT 4
        `;
        const relatedProductsResult = await db.query(relatedProductsQuery, [product.product_brand, productId]);

        // Render view và truyền dữ liệu vào Handlebars
        res.render('product_detail', {
            product,
            related_products: relatedProductsResult.rows
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Internal Server Error');
    }
};

const addToCart = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const ipAddress = req.ip; // Sử dụng IP thay cho user ID

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ chưa
        const checkQuery = `SELECT * FROM cart WHERE p_id = $1 AND ip_add = $2`;
        const checkResult = await db.query(checkQuery, [product_id, ipAddress]);

        if (checkResult.rows.length > 0) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng
            const updateQuery = `
                UPDATE cart 
                SET qty = qty + $1 
                WHERE p_id = $2 AND ip_add = $3
            `;
            await db.query(updateQuery, [quantity, product_id, ipAddress]);
        } else {
            // Nếu chưa tồn tại, thêm sản phẩm mới
            const insertQuery = `
                INSERT INTO cart (p_id, ip_add, qty)
                VALUES ($1, $2, $3)
            `;
            await db.query(insertQuery, [product_id, ipAddress, quantity]);
        }

        res.redirect('/cart'); // Chuyển hướng đến trang giỏ hàng
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send('Internal Server Error');
    }
};
module.exports = {
    getProductDetails,
    addToCart,
};
