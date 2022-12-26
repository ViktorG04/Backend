import bcrypt from "bcryptjs";
import generatorJWT from "../helpers/generator-jwt.js";
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check if the user exists by email

    // check if the user is active

    //check the password
    const validPassword = bcrypt.compareSync(password, result["pass"]);
    if (!validPassword) {
      return res.status(401).json({
        msg: "Wrong email or password - password",
      });
    }

    //generate token
    const token = await generatorJWT(user.id);

    //send ok
    res.status(202).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};
