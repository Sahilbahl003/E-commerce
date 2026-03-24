const cloudinary = require("../config/cloudinary");
const Category = require("../models/Category");
const { throwError, throwNotFoundError } = require("../utils/errors");

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

exports.createCategory = async (name, file, parentId = null) => {
  if (!name || !file) throwError("VALIDATION_ERROR");

  const result = await uploadToCloudinary(file);

  return await Category.create({
    name,
    image: result.secure_url,
    parentId: parentId || null,
  });
};

exports.getCategories = async (page, limit, parentId = null) => {
  const skip = (page - 1) * limit;
  let   query = {};

  if (parentId === "null") query.parentId = null;
  else if (parentId) query.parentId = parentId;

  const total = await Category.countDocuments(query);

  const categories = await Category.find(query)
    .populate("parentId", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    categories,
    totalPages: Math.ceil(total / limit)
  };
};

exports.getCategory = async (id) => {
  const category = await Category.findById(id).populate("parentId", "name");
  if (!category) throwNotFoundError("Category");
  return category;
};

exports.updateCategory = async (id, name, file, parentId) => {
  let updateData = { name };

  if (parentId !== undefined) {
    updateData.parentId = parentId || null;
  }

  if (file) {
    const result = await uploadToCloudinary(file);
    updateData.image = result.secure_url;
  }

  const category = await Category.findByIdAndUpdate(id, updateData, { new: true });

  if (!category) throwNotFoundError("Category");

  return category;
};

exports.deleteCategory = async (id) => {
  const category = await Category.findById(id);
  if (!category) throwNotFoundError("Category");

  const hasChildren = await Category.findOne({ parentId: id });
  if (hasChildren) {
    throwError("CATEGORY_HAS_SUBCATEGORIES");
  }

  await Category.findByIdAndDelete(id);
  return true;
};


//in page 2 its show 3 category but in user list it works well its show 5 categories in each page why? also resolve it


// const cloudinary = require("../config/cloudinary");
// const Category = require("../models/Category");
// const { throwError, throwNotFoundError } = require("../utils/errors");
// const { toggleUserStatus } = require("./adminServices");

// const uploadToCloudinary = (file) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream({ folder: "categories" }, (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       })
//       .end(file.buffer);
//   });
// };

// exports.createCategory = async (name, file) => {
//   if (!name) {
//     throwError("VALIDATION_ERROR");
//   }

//   if (!file) {
//     throwError("BAD_REQUEST");
//   }

//   const result = await uploadToCloudinary(file);

//   // const existed = await Category.find({});
//   // if(existed){
//   //     toast.error("category existed");
//   // }

//   const category = await Category.create({
//     name,
//     image: result.secure_url,
//   });

//   return category;
// };

// exports.getCategories = async (page, limit) => {
//   const skip = (page - 1) * limit;
//   const totalCategories = await Category.countDocuments();
      
//   const categories = await Category.find().sort({ createdAt: -1 })
//   .skip(skip)
//   .limit(limit);

//    const totalPages = Math.ceil(totalCategories / limit);


//   return {
//     categories,
//     totalPages
//   };
// };

// exports.getCategory = async (id) => {
//   const category = await Category.findById(id);

//   if (!category) {
//     throwNotFoundError("Category");
//   }

//   return category;
// };

// exports.updateCategory = async (id, name, file) => {
//   let updateData = { name };

//   if (file) {
//     const result = await uploadToCloudinary(file);
//     updateData.image = result.secure_url;
//   }

//   const category = await Category.findByIdAndUpdate(
//     id,
//     updateData,
//     { new: true }
//   );

//   if (!category) {
//     throwNotFoundError("Category");
//   }

//   return category;
// };

// exports.deleteCategory = async (id) => {
//   const category = await Category.findById(id);

//   if (!category) {
//     throwNotFoundError("Category");
//   }

//   await Category.findByIdAndDelete(id);

//   return true;
// };