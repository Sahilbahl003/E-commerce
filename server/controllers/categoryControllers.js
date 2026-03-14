const categoryService = require("../services/categoryServices");

exports.createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(
      req.body.name,
      req.file
    );

    res.status(201).json({
      success: true,
      category,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 5;
      
         console.log("req.query.page",parseInt(req.query.page));
    const data = await categoryService.getCategories(page, limit);

    res.status(200).json({
      success: true,
      categories:data.categories,
      currentPage: page,
      totalPages: data.totalPages
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await categoryService.getCategory(req.params.id);

    res.json({
      success: true,
      category,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body.name,
      req.file
    );

    res.json({
      success: true,
      category,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategory(req.params.id);    
    res.json({
      success: true,
      category,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  } 
};