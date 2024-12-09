const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.showAllProducts);
router.get('/shoes', productController.showAllProductsByCategory1);
router.get('/top', productController.showAllProductsByCategory2);
router.get('/bottom', productController.showAllProductsByCategory3);
router.get('/accessories', productController.showAllProductsByCategory4);

router.get('/essentials', productController.showAllProductsByBrand1);
router.get('/nike', productController.showAllProductsByBrand2);
router.get('/celine', productController.showAllProductsByBrand3);
router.get('/adidas', productController.showAllProductsByBrand4);
router.get('/stussy', productController.showAllProductsByBrand5);

module.exports = router;