const productService = require("../services/productServices");

exports.createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(
      req.body,
      req.file,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};



exports.getAllProducts = async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    console.log("req.query.page",parseInt(req.query.page));

    const filters = {
      category: req.query.category,
      title: req.query.title,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      sort: req.query.sort
    };

    const data = await productService.getAllProducts(page, limit, filters);

    res.status(200).json({
      success: true,
      products: data.products,
      currentPage: page,
      totalPages: data.totalPages
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });

  }

};



exports.getProductById = async (req, res) => {

  try {

    const product = await productService.getProductById(req.params.id);

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message,
    });

  }

};



exports.updateProduct = async (req, res) => {

  try {

    const product = await productService.updateProduct(
      req.params.id,
      req.body,
      req.file,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {

    if (error.message === "Unauthorized") {

      return res.status(403).json({
        success: false,
        message: error.message,
      });

    }

    res.status(404).json({
      success: false,
      message: error.message,
    });

  }

};



exports.deleteProduct = async (req, res) => {

  try {

    await productService.deleteProduct(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {

    if (error.message === "Unauthorized") {

      return res.status(403).json({
        success: false,
        message: error.message,
      });

    }

    res.status(404).json({
      success: false,
      message: error.message,
    });

  }

};




exports.searchProducts = async (req,res)=>{
try{

const { keyword } = req.query;

const data = await productService.searchProducts(keyword);

res.status(200).json({
success:true,
products:data.products,
categories:data.categories
});

}catch(error){

res.status(500).json({
success:false,
message:"Error searching"
});

}
};