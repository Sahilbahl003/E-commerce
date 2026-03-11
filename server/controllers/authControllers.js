const authService = require("../services/authServices");
const { formatZodErrors } = require("../utils/zodErrorFormatter");

exports.register = async (req, res) => {  
  try {    
    const result = await authService.register(req.body);
    if (result?.error) {      
  return res.status(400).json({        
  errors: formatZodErrors(result.error),      
  });    
}
  res.status(200).json({      
  message: "Registered Successfully",      
  user: result.user,      
  token: result.token,    });
  } 
  catch (error) {    
  res.status(400).json({      
    message: error.message,    
  });  
}
};

exports.login = async (req, res) => {  
  try {    
    const result = await authService.login(req.body);
    if (result?.validationErrors) 
   {      
    return res.status(400).json({        
      errors: result.validationErrors,      });   
    }
    res.status(200).json({      
  success: true,      
  message: `${result.user.role} Login Successfully`,      
  token: result.token,      
  user: result.user,    });
  } catch (error) {    
  res.status(401).json({      
    message: error.message,    
  });  
}};

exports.sendRegisterOtp = async (req, res) => {  
  try {    
    await authService.sendRegisterOtp(req.body);
    res.json({ msg: "OTP sent to email" });  
} catch (error) 
{    
  res.status(400).json({      msg: error.message,    });
}};

exports.verifyRegisterOtp = async (req, res) => {  
  try {    
    await authService.verifyRegisterOtp(req.body);
    res.json({ msg: "Account created successfully" });
  } 
catch (error) 
{    
  res.status(400).json({      msg: error.message,    });
  }

};

exports.sendOtp = async (req, res) => {  
  try {    
    await authService.sendOtp(req.body.email);
    res.json({ msg: "OTP sent successfully" });  
} catch (error) 
{    
  res.status(404).json({      
    msg: error.message,    
  });  
}
};

exports.verifyOtp = async (req, res) => {  
  try {    
    await authService.verifyOtp(req.body);
    res.json({ msg: "OTP verified successfully" });
  } catch (error) {    
  res.status(400).json({      
    msg: error.message,    
  });  
}};


exports.resetPassword = async (req, res) => {  
  try {    
    await authService.resetPassword(req.body);
    res.json({ msg: "Password updated successfully" });
  } 
catch (error) 
{    
  res.status(400).json({      
    msg: error.message,    
  });  
}};

exports.changePassword = async (req, res) => {
  try {

    const { currentPassword, newPassword } = req.body;

    await authService.changePassword(
      req.user.id,
      currentPassword,
      newPassword
    );

    res.json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};