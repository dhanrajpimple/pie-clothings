import { useNavigate } from "@remix-run/react";
import React, { useState, useEffect } from "react";
import { deleteCart } from "~/controllers/cartController";
import { imgServer } from "~/utils/domain";

const SideCart = ({ isShowCart, cartList, userId }) => {
  const [showCart, setShowCart] = useState(isShowCart);
  const [cartDetails, setCartDetails] = useState([]);
  const [uId, setUid] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setShowCart(isShowCart);
  }, [isShowCart]);

  useEffect(() => {
    setCartDetails(cartList?.productList);
  }, [cartList]);

  useEffect(() => {
    setUid(userId);
  }, [userId]);

  // const deleteCartById = async (_id) => {
  //   const response = await deleteCart(uId, _id);
  //   if (response?.success) {
  //     setCartDetails((prev) => {
  //       const newCart = prev.filter((p) => p?._id != _id);
  //       console.log(newCart);
  //       return newCart;
  //     });
  //     console.log("Response 88", response);
  //   }
  // };

  const deleteCartById = async (userId = uId, _id, size, quantity) => {
    try {
      if (confirm("Are you sure?")) {
        const response = await deleteCart(userId, _id, size, quantity);
        if (response?.success) {
          setCartDetails((prev) => {
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
      {/* <div className="cartBtn" onClick={() => setShowCart(!showCart)}>
        =
      </div> */}

      <div
        className={showCart ? "fullscreen" : "ca-cncl-no"}
        onClick={() => setShowCart(false)}
      ></div>

      <div className={showCart ? "scart scart-show" : "scart"}>
        <h3>Shopping Cart</h3>
        {cartDetails?.length > 0 ? (
          cartDetails.map((p, i) => {
            return (
              <React.Fragment key={i}>
                <div className="cart-det">
                  <div className="cart-img">
                    <img src={`${imgServer}/imgs/${p?.gallery[0]}`} alt="" />
                  </div>
                  <div className="cart-info">
                    <h5>
                      {p?.name}{" "}
                      <span
                        style={{
                          float: "right",
                          fontFamily: "sans-serif",
                          color: "red",
                        }}
                        onClick={() => {
                          confirm("Are you sure ? ") &&
                            deleteCartById(
                              userId,
                              p?._id,
                              p?.size,
                              p?.quantity
                            );
                        }}
                      >
                        x
                      </span>
                    </h5>
                    {p?.size && <p>Size: {p?.size}</p>}
                    {p?.quantity && <p>Quantity: {p?.quantity}</p>}

                    {/* 
                    <table
                      border={1}
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      {p?.size && p?.size.length > 0 && (
                        <thead>
                          <tr>
                            <th>Size</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                      )}

                      <tbody>
                        {p?.size &&
                          p?.size.length > 0 &&
                          p?.size.map((s) => {
                            return (
                              <tr>
                                <td>{s.size}</td>
                                <td>{s.quantity}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table> */}
                  </div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <>
            <h3 style={{ textAlign: "center", paddingTop: "20px" }}>
              Your cart is empty!
            </h3>

            <p style={{ textAlign: "center", paddingTop: "15px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style={{ width: "100px" }}
              >
                <path
                  d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z"
                  fill="rgba(255,255,255,1)"
                ></path>
              </svg>
            </p>

            <div
              style={{ textAlign: "center" }}
              onClick={() => setShowCart(false)}
            >
              <button
                style={{
                  padding: "5px 40px",
                  marginTop: "10px",
                  fontSize: "20px",
                }}
              >
                Return To Shop
              </button>
            </div>
          </>
        )}

        {cartDetails?.length > 0 && (
          <div className="checkout-btn">
            <button onClick={() => navigate("../checkout")}>Checkout</button>
          </div>
        )}
      </div>

      <div
        className={showCart ? "ca-cncl" : "ca-cncl-no"}
        onClick={() => setShowCart(false)}
      >
        <svg
          fill="white"
          style={{ width: "30px" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
        </svg>
      </div>
    </>
  );
};

export default SideCart;
