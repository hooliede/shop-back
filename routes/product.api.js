const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const productController = require("../controllers/product.controller");

// 중간에 미들웨어를 통해서 level이 admin인지 아닌지 확인
router.post(
  "/",           
  authController.authenticate,         // token을 통해서 admin인지 아닌지 확인을 해야 하는데
  authController.checkAdminPermission, // authenticate에서 token 정보가 있어서 미들웨어에 추가
  productController.createProduct
);

module.exports = router;
