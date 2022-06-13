// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var bcrypt = require("bcryptjs");

require("dotenv").config();
var jwt = require("jsonwebtoken");
import { setCookies } from "cookies-next";
const handler = async (req, res) => {
  if (req.method === "POST") {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("Exist");
      return res
        .status(400)
        .json({ msg: "This user is already exist", success: false });
    }
    const { name, email } = req.body;
    let salt = bcrypt.genSaltSync(10);

    const secPassword = bcrypt.hashSync(req.body.password, salt);

    let newUser = await new User({ name, email, password: secPassword });

    let savedUser = await newUser.save();

    // let Euser = await User.findOne({ email: newUser. });
    const userID = {
      id: savedUser._id,
    };

    // console.log(Euser);
    var token = jwt.sign(userID, process.env.SECRET);

    setCookies("auth_token", token, { req, res });
    return res
      .status(200)
      .json({ success: true, msg: "User is created successfully", token });
  } else {
    return res
      .status(400)
      .json({ msg: "This method is not allowed", success: false });
  }
};
export default connectDb(handler);
