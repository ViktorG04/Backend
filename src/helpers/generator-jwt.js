import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generatorJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      config.keyJWT,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error with token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generatorJWT;
