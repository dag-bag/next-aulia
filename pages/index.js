import Main from "../components/Main";
import Head from "next/head";
import Image from "next/image";
import Features from "../components/Features";
import Products from "../components/Products";

export default function Home({ addToCart, Cart, removeFromCart }) {
  return (
    <div>
      {/* Main */}
      <Main />
      {/* Features of website */}
      <Features />
      {/* Products Section */}
      <Products addToCart={addToCart} removeFromCart={removeFromCart} />
    </div>
  );
}
