import Categories from "../database/models/categories.js";

export const getCategories = async (req, res) => {
  try {
    const query = await Categories.findAll({ attributes: [["idCategory", "id"], "name"] });
    if (!query.length) {
      return res.status(400).json({ message: "no data" });
    }

    res.status(200).json(query);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "contact the administrator" });
  }
};
