import Head from "next/head";
import React, { useState } from "react";
import Script from "next/script";
import Image from "next/image";

export default function Checkout({
  Cart,
  addToCart,
  removeFromCart,
  clearCart,
  SubTotal,
}) {
  const [Form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const onChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
    console.log(Form);
  };
  const initiatePayment = async (e) => {
    e.preventDefault();

    let oid = "OID" + Math.floor(Math.random() * Date.now());

    // get a transaction token
    let data = {
      Cart,
      amount: SubTotal,
      orderId: oid,
      ...Form,
    };
    console.log(typeof Cart);
    const resp = await fetch("http://localhost:3000/api/pretransaction", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const paytmresp = await resp.json();
    let txnToken = paytmresp.body.txnToken;
    console.log(txnToken);
    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid /* update order id */,
        token: txnToken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: SubTotal /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      // initialze configuration using init method
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    }
  };
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        id="first"
        type="application/javascript"
        crossorigin="anonymous"
        src="https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/ACMcaY34980573593721.js"
        // onload="onScriptLoad();"
      ></Script>

      <div className="mt-20">
        <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
          Tailwind CSS Ecommerce Checkout Page UI
        </h1>
      </div>
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">
              Shipping Address
            </h2>
            <form
              onSubmit={initiatePayment}
              className="justify-center w-full mx-auto"
              method="post"
            >
              <div className="">
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="name"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="First Name"
                      onChange={onChange}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="phone"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Phone
                    </label>
                    <input
                      name="phone"
                      type="phone"
                      onChange={onChange}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Email
                    </label>
                    <input
                      name="email"
                      type="text"
                      onChange={onChange}
                      placeholder="email"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="address"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Address
                    </label>
                    <textarea
                      className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      name="address"
                      cols="20"
                      rows="4"
                      placeholder="Address"
                      onChange={onChange}
                    ></textarea>
                  </div>
                </div>
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="city"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      City
                    </label>
                    <input
                      name="city"
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="postcode"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Postcode
                    </label>
                    <input
                      name="postcode"
                      type="text"
                      placeholder="Post Code"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <label className="flex items-center text-sm group text-heading">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                    />
                    <span className="ml-2">
                      Save this information for next time
                    </span>
                  </label>
                </div>
                <div className="relative pt-3 xl:pt-6">
                  <label
                    htmlFor="note"
                    className="block mb-3 text-sm font-semibold text-gray-500"
                  >
                    {" "}
                    Notes (Optional)
                  </label>
                  <textarea
                    name="note"
                    className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                    rows="4"
                    placeholder="Notes for delivery"
                  ></textarea>
                </div>
                <div className="mt-4">
                  <button
                    disabled={SubTotal === 0 ? true : false}
                    className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900 disabled:bg-blue-400"
                  >
                    Pay : ₹{SubTotal}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-8">
                <div className="flex flex-col space-y-4">
                  {Object.keys(Cart).length === 0 && (
                    <div>
                      No items in the cart. <br /> Please add few items in the
                      cart
                    </div>
                  )}
                  {Object.keys(Cart).map((k) => {
                    return (
                      <div className="flex space-x-4" key={k}>
                        <div className="w-50 relative">
                          <Image
                            src={Cart[k].img}
                            alt="image"
                            className=""
                            layout="fixed"
                            width={100}
                            height={70}
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">
                            {Cart[k].name}({Cart[k].size}/{Cart[k].variant})
                          </h2>
                          <span className="text-red-600">Price</span> ₹{" "}
                          {Cart[k].price}
                        </div>
                        <div className="flex w-1/3 justify-center items-center space-x-2">
                          <svg
                            onClick={() => {
                              removeFromCart(k, 1, Cart[k].name, Cart[k].price);
                            }}
                            className="fill-current text-gray-600 w-3 cursor-pointer"
                            viewBox="0 0 448 512"
                          >
                            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                          {Cart[k].qty}
                          <svg
                            onClick={() => {
                              addToCart(
                                k,
                                1,

                                Cart[k].name,
                                Cart[k].price
                              );
                            }}
                            className="fill-current text-gray-600 w-3 cursor-pointer"
                            viewBox="0 0 448 512"
                          >
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            removeFromCart(
                              k,
                              Cart[k].qty,
                              Cart[k].name,
                              Cart[k].price
                            );
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })}

                  {/* END */}
                </div>
              </div>
              <div className="flex p-4 mt-4">
                <h2 className="text-xl font-bold">TOTAL PRICE</h2>
              </div>
              <div
                className={
                  "flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0 "
                }
              >
                Subtotal<span className="ml-2">₹{SubTotal}</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Shipping Tax<span className="ml-2">$10</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Total<span className="ml-2">$50.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
