import Option from "../models/Option";
import Product from "../models/Product";

export const getOption = async () => {
  try {
    const { idProduct } = req.params;
    const option = await Option.find({ product: idProduct });
    return res.status(200).json({ result: option });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const createOption = async (req, res) => {
  try {
    const { product, nameColor, price, discountValue, quantity } = req.body;

    const isProductExist = await Product.findById(product);

    if (!isProductExist) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!isProductExist.flag) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!req.file) {
      return res.status(404).json({ message: "file not found" });
    }

    console.log(req.file.path);

    let image = `http://localhost:3000/options/${req.file.filename}`;

    if (!nameColor || !price || !quantity) {
      return res.status(404).json({
        message: "name color, price and quantity are required",
      });
    }

    const option = new Option({
      product,
      nameColor,
      image,
      price,
      discountValue,
      quantity,
    });

    await option.save();

    isProductExist.option.push(option._id);

    await isProductExist.save();

    return res
      .status(201)
      .json({ message: "created successfully", result: option });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const updateOption = async (req, res) => {
  try {
    const { id } = req.params;
    const { product, nameColor, price, discountValue, quantity } = req.body;

    const isProductExist = await Product.findById(product);

    if (!isProductExist) {
      return res.status(404).json({ message: "Product not found" });
    }

    const optionExists = await Option.findById(id);

    if (!isProductExist.flag) {
      return res.status(404).json({ message: "Product not found" });
    }
    let image;
    if (req.file) {
      image = `http://localhost:3000/options/${req.file.filename}`;
    }

    const option = await Option.findByIdAndUpdate(
      id,
      {
        product,
        nameColor,
        price,
        image,
        discountValue,
        quantity,
      },
      { new: true }
    );

    if (!option) {
      return res.status(404).json({ message: "option not found" });
    }

    return res
      .status(200)
      .json({ message: "Update successfully", result: option });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const deleteOption = async (req, res, next) => {
  try {
    const { id } = req.params;
    const option = await Option.findByIdAndUpdate(
      id,
      {
        flag: false,
      },
      { new: true }
    );

    if (!option) {
      return res.status(404).json({ message: "option not found" });
    }
    return res.status(200).json({ message: "Delete successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};
