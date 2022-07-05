import React from "react";
import ProductCard from "./ProductCard";
import Product from "../models/Product";
import mongoose, { mongo } from "mongoose";
export default function Products({ addToCart, Cart, products }) {
  return (
    <>
      <h1 className="font-bold text-center text-3xl">Our Product</h1>
      <div className="py-10 max-w-7xl gap-3 m-auto mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:py-6 p-4 md:gap-3 lg:gap-6">
        {products &&
          Object.keys(products).map((k) => {
            return (
              <ProductCard
                id={products[k]._id}
                slug={products[k].slug}
                key={products[k]._id}
                title={products[k].title}
                desc={products[k].desc}
                src={products[k].img}
                price={products[k].price}
                category={products[k].category}
                addToCart={addToCart}
              />
            );
          })}
        {!products && <div>Network Error</div>}
      </div>
    </>
  );
}
