import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Token = () => {
  const router = useRouter();
  const { token } = router.query;

  const verification = async () => {
    const resp = await fetch("http://localhost:3000/api/verification", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    });

    const respData = await resp.json();

    const { token, success, msg, name } = respData;
    if (success) {
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
    console.log(respData);
  };
  useEffect(() => {
    verification();
    console.log("useefffect is running");
  }, [router.query]);

  return (
    <div>
      <section>
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div className="flex flex-col w-full mb-12 text-center">
            <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-green-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
              User is verified Sucessfully
            </h1>
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
