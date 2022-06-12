// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
const handler = async (req, res) => {
  let users = await User.find();

  res.status(200).json({ users });
};
export default connectDb(handler);
