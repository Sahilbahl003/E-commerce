const {
  toggleWishlistService,
  getWishlistService
} = require("../services/wishlistServices");


exports.toggleWishlist = async (req, res) => {
  try {

    console.log("REQ USER:", req.user);
    console.log("REQ BODY:", req.body);

    const userId = req.user?.id || req.user?._id;
    const { productId } = req.body;

    console.log("USER ID:", userId);
    console.log("PRODUCT ID:", productId);

    const data = await toggleWishlistService(userId, productId);

    res.json(data);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


exports.getWishlist = async (req, res) => {

  try {

    const userId = req.user.id;

    const data = await getWishlistService(userId);

    res.json({
      success: true,
      products: data.products
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};