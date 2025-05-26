import Category from "../../schema/category.js"

export const getCategory = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
}

export const getCategoryById = async (req, res) => {
  const categories = await Category.findOne();
  res.json(categories);
}

export const postCategory = async (req, res) => {
  const categories = await Category.insertOne();
  res.json(categories);
}

export const updateCategory = async (req, res) => {
  const categories = await Category.findOneAndUpdate();
  res.json(categories);
}

export const deleteCategory = async (req, res) => {
  const categories = await Category.deleteOne();
  res.json(categories);
}