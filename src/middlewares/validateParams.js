import { validationResult } from "express-validator";

const validationParams = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  next();
};

export default validationParams;
