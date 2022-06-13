import React, { useState } from "react";

import Link from "next/link";

import { RiMenu3Fill } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { BiUserCircle, BiSearchAlt } from "react-icons/bi";

export default function Header({ Cart }) {
  let items = 0;
  const itemArray = Object.values(Cart);

  for (let i = 0; i < itemArray.length; i++) {
    items = items + itemArray[i].qty;
  }
  // Search bar active or unactive
  const [IsActive, setIsActive] = useState(false);
  const activator = () => {
    if (!IsActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  // Menu Active
  const [MenuActive, setMenuActive] = useState(false);
  const menuActivator = () => {
    if (!MenuActive) {
      setMenuActive(true);
    } else {
      setMenuActive(false);
    }
  };

  return (
    <div>
      <header className="bg-white shadow-lg relative">
        <div
          className={`smNavbar absolute h-[100vh] ${
            MenuActive ? "w-[15rem]" : "w-0"
          } overflow-hidden bg-white left-0 top-0 md:hidden z-40 transition-all duration-300 ease-in-out`}
        >
          <div className=" list-none p-5 mt-8">
            <li
              className="text-lg  hover:shadow-md font-bold rounded-md py-2 px-4"
              onClick={() => {
                setMenuActive(false);
              }}
            >
              <Link href={"/"}>Home</Link>
            </li>
            <li
              className="text-lg  hover:shadow-md font-bold rounded-md py-2 px-4"
              onClick={() => {
                setMenuActive(false);
              }}
            >
              <Link href={"/products"}>Products</Link>
            </li>
            <li
              onClick={() => {
                setMenuActive(false);
              }}
              className="text-lg  hover:shadow-md font-bold rounded-md py-2 px-4"
            >
              <Link href={"/portfolio"}>Portfolio</Link>
            </li>
            <li
              onClick={() => {
                setMenuActive(false);
              }}
              className="text-lg  hover:shadow-md font-bold rounded-md py-2 px-4"
            >
              <Link href={"/contact"}>Contact</Link>
            </li>
          </div>
        </div>

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
              {/* <FaReact className="text-orange-400 text-2xl" /> */}

              <svg
                className="w-8 text-orange cursor-pointer"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <rect x="3" y="1" width="7" height="12" />
                <rect x="3" y="17" width="7" height="6" />
                <rect x="14" y="1" width="7" height="6" />
                <rect x="14" y="11" width="7" height="12" />
              </svg>

              {/* <h2 className="font-extralight text-xl">Aulia</h2> */}
            </Link>

            <RiMenu3Fill
              className="md:hidden mt-1 cursor-pointer text-2xl z-50 text-black"
              onClick={menuActivator}
            />
          </div>
          {/* center */}
          <div className=" list-none space-x-8 hidden md:flex">
            <li className="text-lg  hover:shadow-md font-bold rounded-md py-2 px-4">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="text-lg  hover:shadow-md font-bold rounded-md py-2 px-4">
              <Link href={"/products"}>Products</Link>
            </li>
            <li className="text-lg  hover:shadow-md font-bold rounded-md py-2 px-4">
              <Link href={"/portfolio"}>Portfolio</Link>
            </li>
            <li className="text-lg  hover:shadow-md font-bold rounded-md py-2 px-4">
              <Link href={"/contact"}>Contact</Link>
            </li>
          </div>
          {/* RIght */}
          <div className="flex justify-center items-center md:space-x-6">
            {/* <button className="relative px-4 py-2 font-bold text-black group">
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-orange-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
              <span className="relative">Login</span>
            </button> */}
            {/* <Btn txt="login" path="/login" /> */}
            <Link href={"/login"}>
              <span className="md:py-2 md:px-4 py-1 px-2 rounded-md hover:shadow-md ">
                <BiUserCircle className="md:text-3xl cursor-pointer text-3xl " />
              </span>
            </Link>
            <span className="md:py-2 md:px-4 py-1 px-2 rounded-md hover:shadow-md relative">
              <input
                type="text"
                className={`-bottom-8 z-50 shadow-md absolute  -left-28 md:-left-16 outline rounded-sm ${
                  IsActive ? "block" : "hidden"
                }`}
                placeholder="Search here"
              />
              <BiSearchAlt
                className="md:text-3xl cursor-pointer text-3xl"
                onClick={activator}
              />
            </span>
            <Link href={"/cart"}>
              <span className="md:py-2 md:px-4 py-1 px-2 rounded-md hover:shadow-md relative">
                <span className="absolute bg-orange-600 top-0 right-0 h-5 w-5 text-white rounded-full flex justify-center items-center">
                  {items}
                </span>

                <FiShoppingCart className="md:text-3xl cursor-pointer text-3xl" />
              </span>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
