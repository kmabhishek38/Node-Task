const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");
const productController = require("../controller/productController");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/getproduct", productController);  
router.post("/addproduct", productController.addProductToCart);
router.delete("/removeproduct/:productId", productController.removeProductFromCart);


module.exports = router;
