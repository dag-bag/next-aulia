import React from "react";
import Image from "next/image";

export default function Main() {
  return (
    <div className="w-full h-auto mb-8">
      {/* Carosel */}
      <div className="relative">
        <Image
          src={"/p.jpg"}
          alt="..."
          width={60}
          height={30}
          layout="responsive"
          objectFit="cover"
        />
        <div className="absolute top-0 left-0  bg-black opacity-40 w-full h-full"></div>
        <h2 className="absolute top-2 sm:top-5 sm:text-4xl  text-2xl left-5 md:top-32 md:left-10 lg:top-16 lg:left-10 text-white font-extrabold md:text-6xl">
          We strive to build a commitment-oriented <br /> quality and client
          satisfaction.
        </h2>
      </div>
    </div>
  );
}
