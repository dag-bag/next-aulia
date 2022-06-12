// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";
const handler = async (req, res) => {
  if (req.method === "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let updateProduct = await Product.findByIdAndUpdate(
        req.body[i]._id,
        req.body[i]
      );
    }

    // let newProduct = await new Product(req.body);
    // await newProduct.save();
    res.status(200).json({ success: "Products updated Succesfully" });
  } else {
    return res.status(400).json({ error: "This method is not allowed" });
  }
};
export default connectDb(handler);
