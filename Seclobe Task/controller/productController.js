const ProductModel = require("../models/productmodel");

async function getproduct(req, res) {
  try {
    const user = await ProductModel.find({});

    if (user.length === 0) {
      return res.status(404).json({ msg: "User data not found" });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
async function addProductToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    return res.status(200).json({ msg: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function removeProductFromCart(req, res) {
  try {
    const { productId } = req.params;
    return res.status(200).json({ msg: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
module.exports = {
  getproduct,
  addProductToCart,
  removeProductFromCart,
};

