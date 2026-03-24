const Product = require("../models/Product");
const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");
const { throwError, throwNotFoundError } = require("../utils/errors");

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "products" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(file.buffer);
  });
};

exports.createProduct = async (data, file, userId) => {
  const { title, description, price, stock, category, subcategory } = data;

  if (!title || !description || !price || !stock || !category) {
    throwError("VALIDATION_ERROR");
  }

 
  if (subcategory) {
    const sub = await Category.findById(subcategory);
    if (!sub || sub.parentId.toString() !== category) {
      throwError("INVALID_SUBCATEGORY");
    }
  }

  let image = "";
  if (file) {
    const result = await uploadToCloudinary(file);
    image = result.secure_url;
  }

  return await Product.create({
    title,
    description,
    price,
    stockQuantity: stock,
    category,
    subcategory,
    image,
    seller: userId
  });
};



exports.getAllProducts = async (page, limit, filters = {}) => {
  const skip = (page - 1) * limit;
  let query = {};

  // Filter by category and subcategories
  if (filters.category && filters.category.length > 0) {

  const subcategories = await Category.find({
    parentId: { $in: filters.category }
  }).select("_id");

  const subIds = subcategories.map(s => s._id);

  query.$or = [
    { category: { $in: filters.category } },
    { subcategory: { $in: subIds } }
  ];
}

  // If user specifically selects subcategories, override $or
  if (filters.subcategory && filters.subcategory.length > 0) {
    query.subcategory = { $in: filters.subcategory };
  }

  // Title search
  if (filters.title) {
    query.title = { $regex: filters.title, $options: "i" };
  }

  // Price range
  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
    if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
  }

  // Sorting
  let sort = {};
  if (filters.sort === "priceLow") sort.price = 1;
  if (filters.sort === "priceHigh") sort.price = -1;

  const total = await Product.countDocuments(query);

  const products = await Product.find(query)
    .populate("category", "name")
    .populate("subcategory", "name")
    .populate("seller", "name email")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return {
    products,
    totalPages: Math.ceil(total / limit)
  };
};

exports.getProductById = async (id) => {
  const product = await Product.findById(id)
    .populate("seller", "name email");

  if (!product) throwNotFoundError("Product");
  return product;
};

exports.updateProduct = async (id, data, file, userId) => {
  const product = await Product.findById(id);
  if (!product) throwNotFoundError("Product");

  const { title, description, price, stock, category, subcategory } = data;

  if (subcategory) {
    const sub = await Category.findById(subcategory);
    if (!sub || sub.parentId.toString() !== category) {
      throwError("INVALID_SUBCATEGORY");
    }
  }

  if (file) {
    const result = await uploadToCloudinary(file);
    product.image = result.secure_url;
  }

  product.title = title || product.title;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stockQuantity = stock || product.stockQuantity;
  product.category = category || product.category;
  product.subcategory = subcategory || product.subcategory;

  await product.save();
  return product;
};

exports.deleteProduct = async (id, userId) => {
  const product = await Product.findById(id);
  if (!product) throwNotFoundError("Product");

  await Product.findByIdAndDelete(id);
  return true;
};

exports.searchProducts = async (keyword) => {
  const productQuery = keyword
    ? {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } }
        ]
      }
    : {};

  const categoryQuery = keyword
    ? { name: { $regex: keyword, $options: "i" } }
    : {};

  const products = await Product.find(productQuery).limit(5);
  const categories = await Category.find(categoryQuery).limit(5);

  return { products, categories };
};