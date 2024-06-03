import Footer from "~/component/footer";
import Navbar from "~/component/navbar";
import styles from "../styles/checkout.css";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookies";
import { postAPI } from "~/utils/api";
import { viewCart, deleteCart1 } from "~/controllers/cartController";
import { domain } from "~/utils/domain";

const Checkout = () => {
  const [alreadyAcc, setAlreadyAcc] = useState(false);
  const [userData, setUserData] = useState({
    loggedIn: false,
    userData: {
      name: "",
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      country: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
    cartId: "",
  });
  const [cartList, setCartList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    console.log(cartList);
    setCartTotal(0);
    cartList.forEach((cart) => {
      if (cart?.offerPrice > 0) {
        setCartTotal((total) => total + Number(cart?.offerPrice) * cart?.quantity);
      } else {
        setCartTotal((total) => total + Number(cart?.price) * cart?.quantity);
      }
    });
  }, [cartList]);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    console.log("line 56", userData);
  }, [userData]);

  const viewCartById = async (uid) => {
    const response = await viewCart(uid);
    if (response) {
      console.log("response 57 ", response);
      setUserData((prev) => ({
        ...prev,
        cartId: response?.cart[0]?._id,
      }));
      if (response?.productList.length > 0) {
        setCartList(response?.productList);
      }
    }
  };

  const getUserData = async () => {
    try {
      const res = await getCookie("UD");
      const parsedData = JSON.parse(res);
      if (parsedData?.email) {
        setUserData((prev) => ({
          ...prev,
          loggedIn: true,
          userData: {
            ...parsedData,
            name: `${parsedData.firstName} ${parsedData.lastName}`,
          },
        }));
        viewCartById(parsedData._id);
      }
    } catch (err) {
      console.error("Error getting user data:", err);
    }
  };

  const createOrder = async (i = 1) => {
    try {
      const body = {
        amount:
          i === 1
            ? ((cartTotal + (cartTotal * 18) / 100) * 100).toFixed(2)
            : 100 * 100, // amount in paise (e.g., 50000 paise = INR 500)
        currency: "INR",
      };
      const response = await postAPI(`${domain}/api/order/create`, JSON.stringify(body));
      if (response && response.id) {
        setOrderId(response.id);
        handlePayment(i, response.id);
      } else {
        console.error("Failed to create order:", response);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handlePayment = async (i, oid) => {
    const options = {
      key: "rzp_test_MqoMJgNy2RIv4g",
      amount:
        i === 1
          ? ((cartTotal + (cartTotal * 18) / 100) * 100).toFixed(2)
          : 100 * 100, // amount in paise (e.g., 50000 paise = INR 500)
      currency: "INR",
      name: userData?.userData?.name,
      cartId: userData?.cartId,
      description: "PieClothing Store",
      order_id: oid,
      handler: async function (response) {
        console.log("Payment success:", response);
        alert("Payment Successful.");
        const body = {
          order_id: oid,
          payment_id: response?.razorpay_payment_id,
          amountPaid:
            i === 1 ? (cartTotal + (cartTotal * 18) / 100).toFixed(2) : 100,
          amountRemaining:
            i === 1 ? 0 : (cartTotal + (cartTotal * 18) / 100).toFixed(2) - 100,
          name: userData?.userData?.name,
          email: userData?.userData?.email,
          phone: userData?.userData?.phone,
          deliveryAdd: {
            country: userData?.userData?.country,
            address: userData?.userData?.address,
            city: userData?.userData?.city,
            state: userData?.userData?.state,
            pincode: userData?.userData?.pincode,
          },
          cartList: cartList,
          cartId: userData?.cartId,
          uid: userData?.userData?._id,
        };

        console.log('Starting API call at:', new Date());
        const responseOrder = await postAPI(`${domain}/api/order/orderdata`, JSON.stringify(body));
        console.log('Completed API call at:', new Date());
        console.log("Bodyyyy", body);
        if (responseOrder.success) {
          console.log("responseOrder", responseOrder);
          // Delete the cart after successful order creation
          const deleteCartResponse = await postAPI(`${domain}/api/cart/deletecartbyorder/${userData?.cartId}`);
          if (deleteCartResponse.success) {
            console.log("Cart deleted successfully");
            setCartList([]); // Clear the cart list in the state
          } else {
            console.error("Failed to delete cart:", deleteCartResponse.message);
          }
        } else {
          console.error("Failed to create order:", responseOrder.message);
        }
      },
      prefill: {
        name: userData?.userData?.name,
        email: userData?.userData?.email,
        contact: userData?.userData?.phone,
      },
      notes: {
        address: "PIE Clothing",
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Navbar />
      <div className="gs-checkout">
        <div className="gs-form">
          <h1>Checkout</h1>
          <>
            <div className="input">
              <input
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    userData: {
                      ...prev.userData,
                      name: e.target.value,
                    },
                  }))
                }
                value={
                  userData?.userData?.name ||
                  `${userData?.userData?.firstName} ${userData?.userData?.lastName}`
                }
              />
            </div>
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                value={userData?.userData?.email}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    userData: {
                      ...prev.userData,
                      email: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Phone"
                value={userData?.userData?.phone}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    userData: {
                      ...prev.userData,
                      phone: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </>
          <h3>Delivery</h3>
          <div className="input">
            <input
              type="text"
              placeholder="Country"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  userData: {
                    ...prev.userData,
                    country: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Address"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  userData: {
                    ...prev.userData,
                    address: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="input-group">
            <div className="input">
              <input
                type="text"
                placeholder="City"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    userData: {
                      ...prev.userData,
                      city: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="State"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    userData: {
                      ...prev.userData,
                      state: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Pin Code"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    userData: {
                      ...prev.userData,
                      pincode: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
        </div>
        <div className="gs-payy">
          <div className="payment-group">
            <table border={1}>
              <thead>
                <tr>
                  <th>Sub Total</th>
                  <th>Rs.{cartTotal.toFixed(2)}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GST</td>
                  <td>Rs.{((cartTotal * 18) / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>Rs.{(cartTotal + (cartTotal * 18) / 100).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <p onClick={() => createOrder(1)}>
              Pay With GPay / Phone Pay / UPI / Debit Card / Credit Card
            </p>
            {/* <p onClick={() => createOrder(0)}>
              Cash On Delivery <span>(Rs.100 Extra Online)</span>
            </p> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
