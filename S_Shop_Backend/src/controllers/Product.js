import Product from "../models/Product";
import Category from "../models/Category";

export const getProductsByCategory = async (req, res) => {
  try {
    const categories = await Category.find({ flag: true }).populate({
      path: "product",
      match: { flag: true },
      options: { limit: 6 },
    });
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      category,
      name,
      description,
      status,
      screen,
      camera,
      chipset,
      cpu,
      gpu,
      ram,
      rom,
      operatingSystem,
      battery,
      weight,
      connection,
      specialFeature,
      manufacturer,
      other,
    } = req.body;

    if (!category) {
      return res.status(404).json({ message: "category is required" });
    }

    const isCategoryExist = await Category.findById(category);

    if (!isCategoryExist) {
      return res.status(404).json({ message: "category does not exist" });
    }

    if (!name) {
      return res.status(404).json({ message: "name is required" });
    }
    if (!status) {
      return res.status(404).json({ message: "status is required" });
    }

    if (!manufacturer) {
      return res.status(404).json({ message: "manufacturer is required" });
    }

    const product = new Product({
      category,
      name,
      description,
      status,
      screen,
      camera,
      chipset,
      cpu,
      gpu,
      ram,
      rom,
      operatingSystem,
      battery,
      weight,
      connection,
      specialFeature,
      manufacturer,
      other,
    });

    await product.save();

    isCategoryExist.product.push(product._id);
    await isCategoryExist.save();
    return res
      .status(201)
      .json({ message: "created successfully", result: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      screen,
      camera,
      chipset,
      cpu,
      gpu,
      ram,
      rom,
      operatingSystem,
      battery,
      weight,
      connection,
      specialFeature,
      manufacturer,
      other,
    } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        screen,
        camera,
        chipset,
        cpu,
        gpu,
        ram,
        rom,
        operatingSystem,
        battery,
        weight,
        connection,
        specialFeature,
        manufacturer,
        other,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Update successfully", result: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        flag: false,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Delete successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const deltailProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("option")
      .populate("review")
      .populate("category");

    return res.status(200).json({ result: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};
