import Header from "../components/Header";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { checkCookies, getCookie, removeCookies } from "cookies-next";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const [Cookie, setCookie] = useState();
  const [Key, setKey] = useState(0);
  const router = useRouter();
  useEffect(() => {
    console.log(window.datalayer);
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        SaveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
    }
    // removeCookies("auth_token");
    const checkCookie = checkCookies("auth_token");

    if (checkCookie) {
      let cookie = getCookie("auth_token");

      setCookie({ value: cookie });

      // removeCookies("auth_token");
      setKey(Math.random());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
  const [progress, setProgress] = useState(0);
  const [Cart, setCart] = useState({});
  const [SubTotal, setSubTotal] = useState(0);

  const SaveCart = (MyCart) => {
    localStorage.setItem("cart", JSON.stringify(MyCart));
    let keys = Object.keys(MyCart);
    let subt = 0;
    for (let i = 0; i < keys.length; i++) {
      subt += MyCart[keys[i]].price * MyCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };
  const addToCart = (itemCode, qty, name, price, img, key) => {
    let NewCart = Cart;
    if (itemCode in Cart) {
      NewCart[itemCode].qty = Cart[itemCode].qty + qty;
    } else {
      NewCart[itemCode] = { qty: 1, name, price, img };
    }

    setCart(NewCart);
    SaveCart(NewCart);

    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        item_id: key,
        item_name: name,
        price: price,
        currency: "INR",
        items: [
          {
            productId: key,
            name: name,
            price: price,
            qty: qty,
          },
        ],
      },
    });
    let a = [
      {
        ecommerce: {
          item_id: key,
          item_name: name,
          price: price,
          currency: "INR",
          items: [
            { itemCode, productId: key, name: name, price: price, qty: qty },
          ],
        },
      },
    ];
    console.log(a);

    toast.success("Item Added to cart", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const buyNow = (itemCode, qty, size, name, price, variant) => {
    SaveCart({});
    let NewCart = { itemCode: { qty: 1, size, name, price, variant } };

    setCart(NewCart);
    SaveCart(NewCart);
    router.push("/checkout");
  };
  const clearCart = () => {
    setCart({});
    SaveCart({});
    toast.warn("Cart is cleared", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const removeFromCart = (itemCode, qty, name, price) => {
    let NewCart = Cart;
    if (itemCode in Cart) {
      NewCart[itemCode].qty = Cart[itemCode].qty - qty;
    }
    if (NewCart[itemCode].qty <= 0) {
      delete NewCart[itemCode];
    }
    setCart(NewCart);
    SaveCart(NewCart);
    toast.success("Item remove from cart", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  // // To get all the thshits
  // const [Tshirt, setTshirt] = useState([]);
  // const getAllTshirt = async () => {
  //   const resp = await fetch("http://localhost:3000/api/getproducts");
  //   const respData = await resp.json();
  //   setTshirt(respData);
  // };
  const auth = async (ep, path, Rpath) => {
    const resp = await fetch(`/api/${path}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ep),
    });
    const respData = await resp.json();

    const { token, success, msg, name } = respData;
    console.log(msg);

    if (success) {
      let cookie = getCookie("auth_token");
      if (cookie === token) {
        setCookie({ value: cookie });
        toast.success(msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      // localStorage.setItem("token", authtoken);
      // setTimeout(() => {
      //   router.push(Rpath);
      // }, 2000);
    } else {
      toast.error(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      //   props.showAlert("danger", "Invalid credentials");
    }
  };
  const logout = () => {
    removeCookies("auth_token");
    toast.success("You have logout successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setKey(Math.random());
    setCookie({ value: null });
    router.push("/");
  };
  return (
    <>
      <Script
        id="my-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-55GFBMB');`,
        }}
      />
      <Script
        id={"datalayer"}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            
          `,
        }}
      />
      {/* window.dataLayer.push({ 
    "attributes": {
       'pagePostAuthor': 'Julius Fedorovicius' 
    }
 }); */}

      <Header Cart={Cart} />
      <Component
        Cookie={Cookie}
        auth={auth}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        Cart={Cart}
        SubTotal={SubTotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
