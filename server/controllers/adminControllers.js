const adminService = require("../services/adminServices");
const { AppError } = require("../utils/errors");

exports.getDashboardStats = async (req, res) => {  
  try {    
    const stats = await adminService.getDashboardStats();

    res.status(200).json({      
      success: true,      
      stats    
    });

  } catch (error) {    
    res.status(500).json({      
      success: false,      
      message: "Error loading dashboard",      
      error: error.message    
    });  
  }
};

exports.getAllUsers = async (req, res) => {  
  try {  
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const data = await adminService.getAllUsers(page,limit);

    res.status(200).json({
      success: true,
      users: data.users,
      currentPage: page,
      totalPages: data.totalPages
    });

  } catch (error) {    
    res.status(500).json({      
      success: false,      
      message: "Error fetching users"    
    });  
  }
};

exports.deleteUser = async (req, res) => {  
  try {    
    await adminService.deleteUser(req.params.id);

    res.status(200).json({      
      success: true,      
      message: "User deleted successfully"    
    });

  } catch (error) {    
    res.status(404).json({      
      success: false,      
      message: error.message    
    });  
  }
};

exports.getAllProductsAdmin = async (req, res) => {  
  try {    
    const products = await adminService.getAllProductsAdmin();

    res.status(200).json({      
      success: true,      
      products    
    });

  } catch (error) {    
    res.status(500).json({      
      success: false,      
      message: "Error fetching products"    
    });  
  }
};

exports.deleteProductAdmin = async (req, res) => {  
  try {    
    await adminService.deleteProductAdmin(req.params.id);

    res.status(200).json({      
      success: true,      
      message: "Product deleted by admin"    
    });

  } catch (error) {    
    res.status(404).json({      
      success: false,      
      message: error.message    
    });  
  }
};

exports.getAllOrders = async (req, res) => {  
  try {    
    const orders = await adminService.getAllOrders();

    res.status(200).json({      
      success: true,      
      orders    
    });

  } catch (error) {    
    res.status(500).json({      
      success: false,      
      message: "Error fetching orders"    
    });
  }
};

exports.updateOrderStatus = async (req, res) => {  
  try {    
    const order = await adminService.updateOrderStatus(
      req.params.id,
      req.body.status
    );

    res.status(200).json({      
      success: true,      
      message: "Order status updated",      
      order    
    });

  } catch (error) {    
    res.status(404).json({      
      success: false,      
      message: error.message    
    });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {

    const user = await adminService.toggleUserStatus(req.params.id);

    res.status(200).json({
      success: true,
      message: user.isActive ? "User activated" : "User deactivated",
      user
    });

  } catch (error) {

    const statusCode = error instanceof AppError ? error.statusCode : 500;

    res.status(statusCode).json({
      success: false,
      message: error.message
    });

  }
};