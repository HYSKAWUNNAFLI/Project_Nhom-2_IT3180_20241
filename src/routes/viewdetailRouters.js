const express = require('express');
const router = express.Router();
const viewdetailController = require('../controllers/viewdetailController');

// Route xử lý khi có `product_id`
router.get('/:product_id', viewdetailController.getProductDetails);

// Route mặc định nếu không có `product_id`
router.get('/', (req, res) => {
    res.status(400).send('Please provide a valid product ID.');
});

router.post('/add-to-cart', viewdetailController.addToCart);

module.exports = router;
