// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";
const handler = async (req, res) => {
  if (req.method === "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let newProduct = new Product({
        title: req.body[i].title,
        desc: req.body[i].desc,
        slug: req.body[i].slug,
        img: req.body[i].img,
        category: req.body[i].category,

        price: req.body[i].price,
        availableQty: req.body[i].availableQty,
      });
      await newProduct.save();
    }

    // let newProduct = await new Product(req.body);
    // await newProduct.save();
    res.status(200).json({ success: "success" });
  } else {
    return res.status(400).json({ error: "This method is not allowed" });
  }
};
export default connectDb(handler);
