import Jwt from "jsonwebtoken";
import config from "../config/config.js";

const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    res.status(401).json({ msg: "token not found" });
  }

  try {
    const payload = Jwt.verify(token, config.keyJWT);

    /*   //check if the user is registered
    const {idUser} = payload;
    const user = await findUser();
    if(!user){
      res.status(401).json({msg: "user not found"})
    };

   */
    next();
  } catch (error) {
    res.status(401).json({ msg: "The token is invalid" });
  }
};
