import Cart from "../models/Cart";

export const getAllCart = async (req, res, next) => {
  try {
    const id = req.user._id;
    const cart = await Cart.find({ user: id });
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const id = req.user._id;
    const { option, quantity } = req.body;
    const data = new Cart({
      user: id,
      option,
      quantity,
    });
    await data.save();
    const cart = await Cart.findById(data._id).populate("option");
    return res.status(201).json({ result: cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findByIdAndUpdate(id, { quantity }, { new: true });
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }
    return res.status(200).json({ message: "update success", result: cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }
    return res.status(200).json({ message: "cart successfully removed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};
