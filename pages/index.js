import Main from "../components/Main";
import Head from "next/head";
import Image from "next/image";
import Features from "../components/Features";
import Products from "../components/Products";
import Product from "../models/Product";
import Script from "next/script";
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

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://next-aulia.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Best packaging site - aulia." />
        <meta
          property="og:description"
          content="this is website about the packaging."
        />
        <meta
          property="og:image"
          content="https://next-aulia.vercel.app/overview.jpeg"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="next-aulia.vercel.app" />
        <meta property="twitter:url" content="https://next-aulia.vercel.app/" />
        <meta name="twitter:title" content="Best packaging site - aulia." />
        <meta
          name="twitter:description"
          content="this is website about the packaging."
        />
        <meta
          name="twitter:image"
          content="https://next-aulia.vercel.app/overview.jpeg"
        />

        {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --> */}
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
