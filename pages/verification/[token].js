import { useRouter } from "next/router";
import React, { useEffect } from "react";
import User from "../../models/User";
import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";

const Token = ({ verified, Cookie }) => {
  let cookie = getCookie("auth_token");
  console.log(cookie);
  var decoded = jwt.verify(cookie, "VIRENDERISAHACKERKABAAP");

  // const router = useRouter();
  // const { token } = router.query;
  // let token = router.query.token

  // const verification = async () => {
  //   const resp = await fetch("/api/verification", {
  //     method: "PUT", // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(token),
  //   });

  //   const respData = await resp.json();

  //   const { token, success, msg, name } = respData;
  //   if (success) {
  //     setTimeout(() => {
  //       router.push("/");
  //     }, 1500);
  //   }
  //   console.log(respData);
  // };
  // useEffect(() => {
  //   verification();
  //   console.log("useefffect is running");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <section>
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div className="flex flex-col w-full mb-12 text-center">
            {verified[0].success && (
              <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-green-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
                {verified[0].msg}
              </h1>
            )}
            {!verified[0].success && (
              <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-red-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
                {verified[0].msg}
              </h1>
            )}
            <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-center text-gray-500">
              Free and Premium themes, UI Kits, templates and landing pages
              built with Tailwind CSS, HTML &amp; Next.js.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Token;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO);
  }

  let verified = [];

  try {
    let user = await User.findByIdAndUpdate(context.query.token, {
      verification: true,
    });
    if (user) {
      verified.push({ msg: "User is Verified", success: true });
    }

    if (!user) {
      verified.push({ msg: "User is not Verified", success: false });
    }
  } catch (error) {
    verified.push({ msg: "User is not Verified", success: false });
  }

  return {
    props: { verified }, // will be passed to the page component as props
  };
}
