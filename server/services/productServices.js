const Product = require("../models/Product");
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
  const { title, description, price, stock, category } = data;

  if (!title || !description || !price || !stock || !category) {
    throwError("VALIDATION_ERROR");
  }

  let imageUrl = "";

  if (file) {
    const result = await uploadToCloudinary(file);
    imageUrl = result.secure_url;
  }

  const product = await Product.create({
    title,
    description,
    price,
    stockQuantity: stock,
    category,
    image: imageUrl,
    seller: userId,
  });

  return product;
};

exports.getAllProducts = async (page, limit, filters = {}) => {

  const skip = (page - 1) * limit;

  const query = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.title) {
    query.title = { $regex: filters.title, $options: "i" };
  }

  if (filters.minPrice || filters.maxPrice) {

    query.price = {};

    if (filters.minPrice) {
      query.price.$gte = Number(filters.minPrice);
    }

    if (filters.maxPrice) {
      query.price.$lte = Number(filters.maxPrice);
    }

  }

  let sortOption = {};

  if (filters.sort === "priceLow") {
    sortOption.price = 1;
  }

  if (filters.sort === "priceHigh") {
    sortOption.price = -1;
  }

  const totalProducts = await Product.countDocuments(query);

  const products = await Product.find(query)
    .populate("category", "name")
    .populate("seller", "name email")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(totalProducts / limit);

  return {
    products,
    totalPages
  };

};


exports.getProductById = async (id) => {
  const product = await Product.findById(id)
    .populate("seller", "name email");

  if (!product) {
    throwNotFoundError("Product");
  }

  return product;
};

exports.updateProduct = async (id, data, file, userId) => {
  const product = await Product.findById(id);

  if (!product) {
    throwNotFoundError("Product");
  }

  if (product.seller.toString() !== userId) {
    throwError("UNAUTHORIZED");
  }

  const { title, description, price, stock, category } = data;

  let imageUrl = product.image;

  if (file) {
    const result = await uploadToCloudinary(file);
    imageUrl = result.secure_url;
  }

  product.title = title || product.title;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stockQuantity = stock || product.stockQuantity;
  product.category = category || product.category;
  product.image = imageUrl;

  await product.save();

  return product;
};

exports.deleteProduct = async (id, userId) => {
  const product = await Product.findById(id);

  if (!product) {
    throwNotFoundError("Product");
  }

  if (product.seller.toString() !== userId) {
    throwError("UNAUTHORIZED");
  }

  await Product.findByIdAndDelete(id);

  return true;
};

const Category = require("../models/Category");

exports.searchProducts = async (keyword)=>{

const productQuery = keyword
?{
$or:[
{title:{$regex:keyword,$options:"i"}},
{description:{$regex:keyword,$options:"i"}}
]
}
:{};

const categoryQuery = keyword
?{name:{$regex:keyword,$options:"i"}}
:{};

const products = await Product.find(productQuery).limit(5);

const categories = await Category.find(categoryQuery).limit(5);

return { products, categories };

};