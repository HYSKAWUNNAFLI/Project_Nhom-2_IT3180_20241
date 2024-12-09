const { config } = require('nodemon');
const pool = require('../models/db'); // Kết nối database từ db.js

// Số sản phẩm hiển thị trên mỗi trang
const productsPerPage = 12;

// Hiển thị tất cả sản phẩm với phân trang
const showAllProducts = async (req, res) => {
    try {
        // Xác định trang hiện tại từ query string (?page=x)
        const page = parseInt(req.query.page) || 1; // Nếu không có ?page, mặc định là trang 1
        const offset = (page - 1) * productsPerPage;

        // Lấy tổng số sản phẩm
        const totalProductsResult = await pool.query('SELECT COUNT(*) FROM products');
        const totalProducts = parseInt(totalProductsResult.rows[0].count);

        // Tính tổng số trang
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        // Lấy danh sách sản phẩm cho trang hiện tại
        const productsResult = await pool.query(
            'SELECT * FROM products ORDER BY product_id ASC LIMIT $1 OFFSET $2 ',
            [productsPerPage, offset]
        );
        const products = productsResult.rows;

        // Tạo danh sách số trang
        const pagination = [];
        for (let i = 1; i <= totalPages; i++) {
            pagination.push({
                pageNumber: i,
                isActive: i === page, // Trang hiện tại được đánh dấu
                url: i === 1 ? '/product' : `/product?page=${i}`, // Đường dẫn nút 1 là /product
            });
        }

        // Gửi dữ liệu sản phẩm và phân trang đến view
        res.render('products', {
            products,           // Danh sách sản phẩm
            pagination,         // Danh sách số trang
            currentPage: page,  // Trang hiện tại
            totalPages,         // Tổng số trang
            currentPageGt1: page > 1,
            currentPageLtTotalPages: page < totalPages,
            currentPageMinus1: page > 1 ? (page === 2 ? '/product' : `/product?page=${page - 1}`) : null,
            currentPagePlus1: page < totalPages ? `/product?page=${page + 1}` : null,
        });
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).send('Internal Server Error');
    }
};

//GetProductsByCategory
const showAllProductsByCategory1 = async (req, res) => {
    try {
        // Xác định danh mục cần lọc (ở đây cố định là product_cat = 1)
        const category = 1;

        // Lấy tất cả sản phẩm theo category
        const productsResult = await pool.query(
            'SELECT * FROM products WHERE product_cat = $1',
            [category]
        );
        const products = productsResult.rows;

        // Gửi dữ liệu sản phẩm đến view
        res.render('products', {
            products, // Danh sách sản phẩm
        });
    } catch (err) {
        console.error('Error fetching products by category:', err.message);
        res.status(500).send('Internal Server Error');
    }
};

const showAllProductsByCategory2 = async (req, res) => {
    try {
        // Xác định danh mục cần lọc (ở đây cố định là product_cat = 1)
        const category = 2;

        // Lấy tất cả sản phẩm theo category
        const productsResult = await pool.query(
            'SELECT * FROM products WHERE product_cat = $1',
            [category]
        );
        const products = productsResult.rows;

        // Gửi dữ liệu sản phẩm đến view
        res.render('products', {
            products, // Danh sách sản phẩm
        });
    } catch (err) {
        console.error('Error fetching products by category:', err.message);
        res.status(500).send('Internal Server Error');
    }
};

const showAllProductsByCategory3 = async (req, res) => {
    try {
        // Xác định danh mục cần lọc (ở đây cố định là product_cat = 1)
        const category = 3;

        // Lấy tất cả sản phẩm theo category
        const productsResult = await pool.query(
            'SELECT * FROM products WHERE product_cat = $1',
            [category]
        );
        const products = productsResult.rows;

        // Gửi dữ liệu sản phẩm đến view
        res.render('products', {
            products, // Danh sách sản phẩm
        });
    } catch (err) {
        console.error('Error fetching products by category:', err.message);
        res.status(500).send('Internal Server Error');
    }
};

const showAllProductsByCategory4 = async (req, res) => {
    try {
        // Xác định danh mục cần lọc (ở đây cố định là product_cat = 1)
        const category = 4;

        // Lấy tất cả sản phẩm theo category
        const productsResult = await pool.query(
            'SELECT * FROM products WHERE product_cat = $1',
            [category]
        );
        const products = productsResult.rows;

        // Gửi dữ liệu sản phẩm đến view
        res.render('products', {
            products, // Danh sách sản phẩm
        });
    } catch (err) {
        console.error('Error fetching products by category:', err.message);
        res.status(500).send('Internal Server Error');
    }
};

const showAllProductsByBrand1 = async (req, res) => {
    try {
        // Xác định brand cần lọc (ở đây cố định là brand_id = 4)
        const brandId = 2;

        // Lấy tất cả sản phẩm theo brand
        const productsResult = await pool.query(
            'SELECT * FROM products WHERE product_brand = $1',
            [brandId]
        );
        const products = productsResult.rows;

        // Gửi dữ liệu sản phẩm đến view
        res.render('products', {
            products, // Danh sách sản phẩm
        });
    } catch (err) {
        console.error('Error fetching products by brand:', err.message);
        res.status(500).send('Internal Server Error');
    }
};



const showAllProductsByBrand2 = async (req, res) => {
    try {
        // Xác định brand cần lọc (ở đây cố định là brand_id = 4)
        const brandId = 1;

        // Lấy tất cả sản phẩm theo brand
        const productsResult = await pool.query(
            'SELECT * FROM products WHERE product_brand = $1',
            [brandId]
        );
        const products = productsResult.rows;

        // Gửi dữ liệu sản phẩm đến view
        res.render('products', {
            products, // Danh sách sản phẩm
        });
    } catch (err) {
        console.error('Error fetching products by brand:', err.message);
        res.status(500).send('Internal Server Error');
    }
};



const showAllProductsByBrand3 = async (req, res) => {
    try {
        // Xác định brand cần lọc (ở đây cố định là brand_id = 4)
        const brandId = 4;

        // Lấy tất cả sản phẩm theo brand
        const productsResult = await pool.query(
            'SELECT * FROM products WHERE product_brand = $1',
            [brandId]
        );
        const products = productsResult.rows;

        // Gửi dữ liệu sản phẩm đến view
        res.render('products', {
            products, // Danh sách sản phẩm
        });
    } catch (err) {
        console.error('Error fetching products by brand:', err.message);
        res.status(500).send('Internal Server Error');
    }
};


const showAllProductsByBrand4 = async (req, res) => {
    try {
        // Xác định brand cần lọc (ở đây cố định là brand_id = 4)
        const brandId = 3;

        // Lấy tất cả sản phẩm theo brand
        const productsResult = await pool.query(
            'SELECT * FROM products WHERE product_brand = $1',
            [brandId]
        );
        const products = productsResult.rows;

        // Gửi dữ liệu sản phẩm đến view
        res.render('products', {
            products, // Danh sách sản phẩm
        });
    } catch (err) {
        console.error('Error fetching products by brand:', err.message);
        res.status(500).send('Internal Server Error');
    }
};



const showAllProductsByBrand5 = async (req, res) => {
    try {
        // Xác định brand cần lọc (ở đây cố định là brand_id = 4)
        const brandId = 5;

        // Lấy tất cả sản phẩm theo brand
        const productsResult = await pool.query(
            'SELECT * FROM products WHERE product_brand = $1',
            [brandId]
        );
        const products = productsResult.rows;

        // Gửi dữ liệu sản phẩm đến view
        res.render('products', {
            products, // Danh sách sản phẩm
        });
    } catch (err) {
        console.error('Error fetching products by brand:', err.message);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = { showAllProducts, showAllProductsByCategory1,showAllProductsByCategory2, showAllProductsByCategory3,showAllProductsByCategory4, showAllProductsByBrand1, showAllProductsByBrand2, showAllProductsByBrand3, showAllProductsByBrand4, showAllProductsByBrand5  };
