import Category from "../models/Category";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ flag: true });
    return res
      .status(200)
      .json({ result: categories, message: "get data successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name: name });
    if (existingCategory) {
      return res.status(409).json({ message: "category already exists" });
    }
    const data = new Category({
      name,
    });
    await data.save();
    return res.status(200).json({ message: "add successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);
    if (category) {
      return res.status(409).json({ message: "category already exists" });
    }

    await Category.findByIdAndUpdate(id, { name });

    return res.status(200).json({ message: "update successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (category) {
      return res.status(409).json({ message: "category already exists" });
    }

    await Category.findByIdAndUpdate(id, { flag: false });
    // await Category.findByIdAndDelete(id);
    return res.status(200).json({ message: "delete successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};
