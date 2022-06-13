import Header from "../components/Header";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  const [Key, setKey] = useState(0);
  const router = useRouter();
  useEffect(() => {
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

    // const checkCookie = checkCookies("auth_token");

    // if (checkCookie) {
    //   let cookie = getCookie("auth_token");

    //   setCookie({ value: cookie });
    //   // removeCookies("auth_token");
    //   setKey(Math.random());
    // }
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
  const addToCart = (itemCode, qty, name, price, img) => {
    let NewCart = Cart;
    if (itemCode in Cart) {
      NewCart[itemCode].qty = Cart[itemCode].qty + qty;
    } else {
      NewCart[itemCode] = { qty: 1, name, price, img };
    }
    console.log(NewCart);
    setCart(NewCart);
    SaveCart(NewCart);

    // toast.success("Item Added to cart", {
    //   position: "bottom-center",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
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
    console.log(respData);
    // const { token, success, msg } = respData;
    // console.log(respData);

    // if (success) {
    //   let cookie = getCookie("auth_token");
    //   console.log(cookie);
    //   setCookie({ value: cookie });
    //   toast.success(msg, {
    //     position: "top-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   // localStorage.setItem("token", authtoken);
    //   setTimeout(() => {
    //     router.push(Rpath);
    //   }, 2000);
    // } else {
    //   toast.error(msg, {
    //     position: "top-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   //   props.showAlert("danger", "Invalid credentials");
    // }
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
      <Header Cart={Cart} />{" "}
      <Component
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
