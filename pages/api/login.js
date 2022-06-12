// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
// require("dotenv").config();
import { setCookies } from "cookies-next";

const handler = async (req, res) => {
  if (req.method === "POST") {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);

      if (req.body.email === user.email && req.body.password === originalText) {
        const userID = {
          id: user.id,
        };
        var token = jwt.sign(userID, process.env.SECRET);
        setCookies("auth_token", token, { req, res });
        return res
          .status(200)
          .json({ success: true, msg: "User is login successfully", token });
      }
    }

    // let newProduct = await new Product(req.body);
    // await newProduct.save();
    res.status(400).json({ success: false, msg: "User is not authenticate" });
  } else {
    return res
      .status(400)
      .json({ msg: "This method is not allowed", success: false });
  }
};
export default connectDb(handler);
