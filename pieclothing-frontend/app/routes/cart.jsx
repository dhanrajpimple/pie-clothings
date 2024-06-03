import Footer from "~/component/footer";
import Navbar from "~/component/navbar";
import styles from "~/styles/cart.css";
import { getCookie, setCookie } from "../utils/cookies";
import { useEffect, useState } from "react";
import { deleteCart, viewCart } from "~/controllers/cartController";
import { frontdomain, imgServer } from "~/utils/domain";
import { useNavigate } from "@remix-run/react";

const Cart = () => {
  const [userId, setUserId] = useState("");
  const [cartList, setCartList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    userDetails();
  }, []);

  useEffect(() => {
    {
      setCartTotal(0);
      cartList.length > 0 &&
        cartList.map((cart) => {
          if (cart?.offerPrice > 0) {
            setCartTotal(
              (total) => total + Number(cart?.offerPrice) * cart?.quantity
            );
          } else {
            setCartTotal(
              (total) => total + Number(cart?.price) * cart?.quantity
            );
          }
        });
    }
  }, [cartList]);

  const userDetails = () => {
    getCookie("UD")
      .then((res) => {
        if (!res) {
          throw err;
        }
        console.log("res 18", res);
        console.log("res 19", JSON.parse(res)?._id);
        setUserId(JSON.parse(res)?._id);
        viewCartById(JSON.parse(res)?._id);
      })
      .catch((err) => {
        getCookie("TUD")
          .then((res) => {
            if (!res) {
              throw err;
            }
            console.log("Res 27", res);
            setUserId(res);
            viewCartById(res);
          })
          .catch((err) => {
            const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
            const numberChars = "0123456789";
            const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

            const allChars =
              uppercaseChars + lowercaseChars + numberChars + specialChars;

            let tempUser = "";
            for (let i = 0; i < 15; i++) {
              const randomIndex = Math.floor(Math.random() * allChars.length);
              tempUser += allChars.charAt(randomIndex);
            }

            setCookie("TUD", tempUser);
            setUserId(tempUser);
            viewCartById(tempUser);
          });
      });
  };

  const viewCartById = async (uid) => {
    const response = await viewCart(uid);
    if (response) {
      console.log("response 57 ", response);
      if (response?.productList.length > 0) {
        await setCartList(response?.productList);
      }
    }
  };

  const deleteCartById = async (userId, _id, size, quantity) => {
    try {
      if (confirm("Are you sure?")) {
        const response = await deleteCart(userId, _id, size, quantity);
        if (response?.success) {
          setCartList((prev) => {
            let newCart;
            if (size == "") {
              newCart = prev.filter((p) => p?._id != _id);
            } else {
              newCart = prev.filter((p) => !(p?._id == _id && p?.size == size));
            }
            console.log(newCart);
            return newCart;
          });
          console.log("Response 88", response);
        }
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart">
        <table border={0}>
          <thead>
            <tr>
              {/* <th>Sr. No.</th> */}
              <th>Image</th>
              <th style={{ minWidth: "100%" }}>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>
                <button className="cncl-btn">X </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartList.length > 0
              ? cartList.map((cart, i) => {
                  return (
                    <tr key={i}>
                      {/* <td>1</td> */}
                      <td>
                        <img
                          src={
                            cart?.gallery?.length > 0
                              ? `${imgServer}/imgs/${cart?.gallery[0]}`
                              : `${imgServer}/imgs/1700847513859.png`
                          }
                          width={50}
                          alt="{cart?.name}"
                        />
                      </td>
                      <td>{cart?.name}</td>
                      <td>
                        Rs.{" "}
                        {cart?.offerPrice > 0 ? cart?.offerPrice : cart?.price}
                      </td>
                      <td>{cart?.quantity}</td>
                      <td>{cart?.size}</td>
                      <td>
                        <button
                          className="cncl-btn"
                          onClick={() =>
                            deleteCartById(
                              userId,
                              cart?._id,
                              cart?.size,
                              cart?.quantity
                            )
                          }
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      {cartList.length > 0 && (
        <div className="cart-total">
          <h2 style={{ paddingRight: "50px" }}> Total : {cartTotal}</h2>
          <button
            className="checkout-btn"
            onClick={() => navigate("../checkout")}
          >
            Proceed To Checkout
          </button>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Cart;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
