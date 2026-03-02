const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, stockQuantity } = req.body;

    if (!title || !description || !price || !stockQuantity) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await Product.create({
      title,
      description,
      price,
      stockQuantity,
      seller: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};


// ================= GET ALL PRODUCTS =================
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller", "name email");

    return res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};


// ================= GET PRODUCT BY ID =================
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate("seller", "name email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching product",
    });
  }
};


// ================= UPDATE PRODUCT =================
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Only owner can update
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { title, description, price, stockQuantity } = req.body;

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stockQuantity = stockQuantity || product.stockQuantity;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating product",
    });
  }
};


// ================= DELETE PRODUCT =================
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Only owner can delete
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting product",
    });
  }
};