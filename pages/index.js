import Main from "../components/Main";
import Head from "next/head";
import Image from "next/image";
import Features from "../components/Features";
import Products from "../components/Products";
import Product from "../models/Product";
import mongoose, { mongo } from "mongoose";

export default function Home({ addToCart, Cart, removeFromCart, products }) {
  return (
    <div>
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
