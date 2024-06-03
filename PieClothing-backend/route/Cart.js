const express = require("express");
const router = express.Router();
const {
  addToCart,
  viewCartById,
  DeleteCartById,
  viewCart,
  DeleteCartByIdAdmin,
  viewCartByCartId,
  deleteCart
} = require("../controllers/CartController");

router.post("/addtocart", addToCart);
router.post("/viewcart", viewCartById);
router.post("/viewcartbycartid", viewCartByCartId);
router.post("/deletecart", DeleteCartById);
router.post("/viewallcart", viewCart);
router.post("/deletecartbyidadmin", DeleteCartByIdAdmin);
router.post("/deletecartbyorder/:cartId", deleteCart);

module.exports = router;
