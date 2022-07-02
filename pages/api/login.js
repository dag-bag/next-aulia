// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
// require("dotenv").config();
import { setCookies } from "cookies-next";

const handler = async (req, res) => {
  if (req.method === "POST") {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      let success = false;
      return res.status(404).send({ error: "user not exist", success });
    }
    if (user) {
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        let success = false;
        return res
          .status(404)
          .send({ error: "wrong password", success, msg: "Wrong password" });
      }
      if (!user.verification) {
        return res.status(404).send({
          error: "User is not authenticate",
          success: false,
          msg: "User is not authenticate",
        });
      }

      const userID = {
        id: user.id,
      };
      var token = jwt.sign(userID, process.env.SECRET);
      setCookies("auth_token", token, { req, res });
      return res.status(200).json({
        success: true,
        msg: "User is login successfully",
        token,
        name: user.name,
      });
    }

    // let newProduct = await new Product(req.body);
    // await newProduct.save();
  } else {
    return res
      .status(400)
      .json({ success: false, msg: "User is not authenticate" });
  }
};
export default connectDb(handler);
