import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCartOne, Search, User } from "@icon-park/react";
import {
  AiOutlineLogin,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaReact } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { BiUserCircle, BiSearchAlt } from "react-icons/bi";
import Btn from "./Btn";
export default function Header({ Cart }) {
  let items = 0;
  const itemArray = Object.values(Cart);

  for (let i = 0; i < itemArray.length; i++) {
    items = items + itemArray[i].qty;
  }

  return (
    <div>
      <header className="bg-white shadow-lg">
        <nav className="max-w-7xl m-auto flex justify-between items-center p-3">
          {/* Left */}
          <div className="flex justify-center items-center space-x-3">
            {/* <Image
              src="me.png"
              alt="Picture of the author"
              width={50}
              height={50}
            /> */}
            <Link href={"/"}>
              <>
                <FaReact className="text-orange-400 text-2xl" />
                <h2 className="font-extralight text-xl">Aulia</h2>
              </>
            </Link>

            <AiOutlineMenu className="md:hidden mt-1 cursor-pointer " />
          </div>
          {/* center */}
          <div className=" list-none space-x-8 hidden md:flex">
            <li className="text-lg  hover:shadow-md font-bold rounded-md py-2 px-4">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="text-lg  hover:shadow-md font-bold rounded-md py-2 px-4">
              <Link href={"/aovu"}>Product</Link>
            </li>
            <li className="text-lg  hover:shadow-md font-bold rounded-md py-2 px-4">
              <Link href={"/fd"}>Portfolio</Link>
            </li>
            <li className="text-lg  hover:shadow-md font-bold rounded-md py-2 px-4">
              <Link href={"/dfd"}>Contact</Link>
            </li>
          </div>
          {/* RIght */}
          <div className="flex justify-center items-center space-x-6">
            {/* <button className="relative px-4 py-2 font-bold text-black group">
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-orange-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
              <span className="relative">Login</span>
            </button> */}
            {/* <Btn txt="login" path="/login" /> */}
            <span className="py-2 px-4 rounded-md hover:shadow-md ">
              <BiUserCircle className="md:text-3xl cursor-pointer text-xl" />
            </span>
            <span className="py-2 px-4 rounded-md hover:shadow-md ">
              <BiSearchAlt className="md:text-3xl cursor-pointer text-xl" />
            </span>
            <Link href={"/cart"}>
              <span className="py-2 px-4 rounded-md hover:shadow-md relative">
                <span className="absolute bg-orange-600 top-0 right-0 h-5 w-5 text-white rounded-full flex justify-center items-center">
                  {items}
                </span>

                <FiShoppingCart className="md:text-3xl cursor-pointer text-xl" />
              </span>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
