import Main from "../components/Main";
import Head from "next/head";
import Image from "next/image";
import Features from "../components/Features";
import Products from "../components/Products";
import Product from "../models/Product";
import mongoose, { mongo } from "mongoose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home({ addToCart, Cart, removeFromCart, products }) {
  return (
    <div>
      <Head>
        <title>Best packaging site - aulia.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="this is website about the packaging."
        />
      </Head>
      <ToastContainer />
      {/* Main */}
      <Main />
      {/* Features of website */}
      <Features />
      {/* Products Section */}
      <Products
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        products={products}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO);
  }

  let products = await Product.find({ category: "cup" });

  // const resp = await fetch("http://localhost:3000/api/getproducts");
  // const products = await resp.json();
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}
