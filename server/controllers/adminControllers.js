const adminService = require("../services/adminServices");

exports.getDashboardStats = async (req, res) => {  
  try {    
    const stats = await adminService.getDashboardStats();
    res.status(200).json({      
    success: true,      
    stats    
  });
  } 
catch (error) {    
    res.status(500).json({      
    success: false,      
    message: "Error loading dashboard",      
    error: error.message    });  
  }
};

exports.getAllUsers = async (req, res) => {  
  try {    
    const users = await adminService.getAllUsers();
    res.status(200).json({      
    success: true,      
    users    });  } 
    catch (error) 
    {    
      res.status(500).json({      
      success: false,      
      message: "Error fetching users"    });  
    }};

exports.deleteUser = async (req, res) => {  
  try {    await adminService.deleteUser(req.params.id);
    res.status(200).json({      
  success: true,      
  message: "User deleted successfully"    
});  } 
catch (error) 
{    res.status(404).json({      
  success: false,      
  message: error.message    
});  
}};

exports.getAllProductsAdmin = async (req, res) => {  
  try {    const products = await adminService.getAllProductsAdmin();
    res.status(200).json({      
  success: true,      
  products    });  } 
  catch (error) {    
    res.status(500).json({      
      success: false,      
      message: "Error fetching products"    });  
    }};

exports.deleteProductAdmin = async (req, res) => {  
  try {    await adminService.deleteProductAdmin(req.params.id);
    res.status(200).json({      
  success: true,      
  message: "Product deleted by admin"    });  } 
  catch (error) {    
    res.status(404).json({      
      success: false,      
      message: error.message    });  
    }};

exports.getAllOrders = async (req, res) => {  
  try {    const orders = await adminService.getAllOrders();
    res.status(200).json({      
  success: true,      
  orders    });  }
   catch (error) {    
    res.status(500).json({      
      success: false,      
      message: "Error fetching orders"    });
      }};
exports.updateOrderStatus = async (req, res) => {  
  try {    const order = await adminService.updateOrderStatus(      req.params.id,      req.body.status    );
    res.status(200).json({      
  success: true,      
  message: "Order status updated",      
  order    });  } 
  catch (error) {    
    res.status(404).json({      
      success: false,      
      message: error.message    });  }};