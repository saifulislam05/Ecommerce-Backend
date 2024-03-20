import userModel from "../../models/user/user.js";

const addressController = async (req, res) => {
  try {
    const { _id, address: currentUserAddress } = req.user;
    const addressDetails = req.body;

    // Prepare the new address object, preserving existing values if not provided in the request
    const newAddress = {
      address: addressDetails?.address || currentUserAddress?.address || "",
      landmark: addressDetails?.landmark || currentUserAddress?.landmark || "",
      city: addressDetails?.city || currentUserAddress?.city || "",
      state: addressDetails?.state || currentUserAddress?.state || "",
      pincode: addressDetails?.pincode || currentUserAddress?.pincode || "",
      country: addressDetails?.country || currentUserAddress?.country || "India",
    };

    // Update the user document with the new address
    await userModel.findByIdAndUpdate(_id, { $set: { address: newAddress } });

    res.json({
      success: true,
      message: "Address updated successfully",
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({
      success: false,
      message: "Error updating address. Please try again later.",
    });
  }
};

export default addressController;
