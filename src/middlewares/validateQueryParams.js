const validateQueryParams = (req, res, next) => {

  const { idAccount, idCategory, date } = req.body;

  let query = {};

  if (!date) {
    if (idAccount && !idCategory) {
      query = { idAccount };
    } else if (idCategory && !idAccount) {
      query = { idCategory };
    } else if (idCategory && idAccount) {
      query = { idAccount, idCategory };
    }
  } else {
    const dateReport = new Date(date).toISOString();

    if (!idAccount && !idCategory) {
      query = { dateReport };
    }
    else if (idAccount && !idCategory) {
      query = { idAccount, dateReport };
    } else if (idCategory && !idAccount) {
      query = { idCategory, dateReport }
    } else {
      query = { idAccount, idCategory, dateReport }
    }
  }

  req.where = query;
  next();

};

export default validateQueryParams;