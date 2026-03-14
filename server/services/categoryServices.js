const cloudinary = require("../config/cloudinary");
const Category = require("../models/Category");
const { throwError, throwNotFoundError } = require("../utils/errors");
const { toggleUserStatus } = require("./adminServices");

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "categories" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(file.buffer);
  });
};

exports.createCategory = async (name, file) => {
  if (!name) {
    throwError("VALIDATION_ERROR");
  }

  if (!file) {
    throwError("BAD_REQUEST");
  }

  const result = await uploadToCloudinary(file);

  // const existed = await Category.find({});
  // if(existed){
  //     toast.error("category existed");
  // }

  const category = await Category.create({
    name,
    image: result.secure_url,
  });

  return category;
};

exports.getCategories = async (page, limit) => {
  const skip = (page - 1) * limit;
  const totalCategories = await Category.countDocuments();
      
  const categories = await Category.find().sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);

   const totalPages = Math.ceil(totalCategories / limit);


  return {
    categories,
    totalPages
  };
};

exports.getCategory = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throwNotFoundError("Category");
  }

  return category;
};

exports.updateCategory = async (id, name, file) => {
  let updateData = { name };

  if (file) {
    const result = await uploadToCloudinary(file);
    updateData.image = result.secure_url;
  }

  const category = await Category.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );

  if (!category) {
    throwNotFoundError("Category");
  }

  return category;
};

exports.deleteCategory = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throwNotFoundError("Category");
  }

  await Category.findByIdAndDelete(id);

  return true;
};