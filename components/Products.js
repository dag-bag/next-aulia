import React from "react";
import ProductCard from "./ProductCard";
import Product from "../models/Product";
import mongoose, { mongo } from "mongoose";
export default function Products({ addToCart, Cart, products }) {
  console.log(products);
  return (
    <>
      <h1 className="font-bold text-center text-3xl">Our Product</h1>
      <div className="py-10 max-w-7xl gap-3 m-auto mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:py-6 p-4 md:gap-3 lg:gap-6">
        <ProductCard
          src={
            "https://images.unsplash.com/photo-1528113205084-1f6d08db49e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y3VwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
          addToCart={addToCart}
        />
      </div>
    </>
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
    props: { products: products }, // will be passed to the page component as props
  };
}
git remote set-url origin https://github.com/kiotie32/artbit-text.git