import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
const handler = async (req, res) => {
  if (req.method === "PUT") {
    let updateUser = await User.findByIdAndUpdate(await req.body, {
      verification: true,
    });

    // let newProduct = await new User(req.body);
    // await newProduct.save();
    res.status(200).json({ success: true, msg: "User Verified succefully" });
  } else {
    return res.status(400).json({ error: "Invalid user", success: false });
  }
};
export default connectDb(handler);
