import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function ProductCard({
  src,
  addToCart,
  title,
  price,
  category,
  slug,
  id,
}) {
  return (
    <div>
      <div className="productCard   shadow-lg rounded-2xl  bg-white w-80 m-auto p-2 cursor-pointer">
        <Link href={`/product/${slug}`}>
          <div className="itemView w-full relative flex justify-center items-center">
            <Image
              src={src}
              alt="adidas"
              className="itemView w-32 p-4 h-36 m-auto rounded-md"
              width={275}
              height={275}
              objectFit="cover"
              layout="fixed"
            />
          </div>
        </Link>

        <div className="bg-orange-200 m-3 p-4 rounded-lg">
          <p className="text-gray-700 text-xl font-bold ">{title}</p>
          <p className=" text-gray-700 text-lg font-bold ">
            Category:{category}
          </p>
          <div className="flex items-center justify-between ">
            <p className="text-gray-700">${price}</p>
            <button
              onClick={() => {
                addToCart(title, 1, title, price, src, id);
              }}
              type="button"
              className="addToCart w-10 h-10 text-base font-medium rounded-full text-gray-700 bg-orange-500 hover:bg-orange-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="mx-auto"
                fill="white"
                viewBox="0 0 1792 1792"
              >
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
