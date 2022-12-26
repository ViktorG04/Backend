export const getCategories = async (req, res) => {
  try {
    //query db
    res.status(200).json({ msg: "response data" });
  } catch (error) {
    return res.status(500).json({ msg: "contact the administrator" });
  }
};
