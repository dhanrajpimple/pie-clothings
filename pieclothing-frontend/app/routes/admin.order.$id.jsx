import AdminHeader from "~/component/adminHeader";
import AdminSidebar from "~/component/adminSidebar";
import isadmin from "~/component/isadmin";

import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { orderdatabyid, updateOrderById } from "../controllers/orderController";
import { viewCartByCartId, viewCartByID } from "../controllers/cartController";
import styles from "../styles/admin.css";
import orderStyle from "../styles/orderid.css";
import { imgServer } from "../utils/domain";

const OrderId = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState();
  const [disable, setDisable] = useState(true);
  const [status, setStatus] = useState(order?.status || "In Progress");

  useEffect(() => {
    console.log(id);
    orderData();
  }, []);

  useEffect(() => {
    console.log(order);
  }, [order]);

  isadmin();

  const orderData = async () => {
    try {
      const response = await orderdatabyid(id);
      if (response?.success) {
        setOrder(response?.order[0]);

        const cartResponse = await viewCartByCartId(response?.order[0]?.cartId);
        // const cartResponse = await viewCartByID(response?.order[0]?.uid);
        console.log(cartResponse);

        setProducts(cartResponse?.productList);
      } else {
        alert("Something went wrong");
      }
      console.log(response);
    } catch (err) {
      alert("Something went wrong");
    }
  };

  const updateOrder = async () => {
    try {
      const updatedOrder = { ...order, status };
      const response = await updateOrderById(id, updatedOrder);
      if (response?.success) {
        alert("Updated Successfully");
        setOrder(updatedOrder);
      } else {
        alert("Update failed");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="dash-container">
        <AdminSidebar />
        <div className="dash-main">
          <AdminHeader />
          <div className="dash-body">
            <div className="dash-content">
              <div
                style={{
                  padding: "10px 20px",
                  // background: "black",
                  color: "white",
                  fontWeight: 600,
                  margin: "10px 30px",
                }}
              ></div>

              {/* <button
                style={{
                  padding: "10px 20px",
                  background: "black",
                  color: "white",
                  fontWeight: 600,
                  margin: "10px 30px",
                }}
                onClick={() => setDisable(!disable)}
              >
                {!disable ? "Cancel" : "Edit"}
              </button> */}

              <div className="order-table">
                <table border={1} className="cust-details">
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th className="input-box">
                        <input
                          type="text"
                          disabled={disable}
                          value={order?.name}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                name: e.target.value,
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <th className="input-box">
                        <input
                          type="text"
                          disabled={true}
                          value={order?.email}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                email: e.target.value,
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <th className="input-box">
                        <input
                          type="text"
                          disabled={disable}
                          value={order?.phone}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                phone: e.target.value,
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>

                    <tr>
                      <th>Address</th>
                      <th className="input-box">
                        <input
                          type="text"
                          disabled={disable}
                          value={order?.deliveryAdd?.address}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                deliveryAdd: {
                                  ...prev.deliveryAdd,
                                  address: e.target.value,
                                },
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>City</th>
                      <th className="input-box">
                        <input
                          type="text"
                          disabled={disable}
                          value={order?.deliveryAdd?.city}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                deliveryAdd: {
                                  ...prev.deliveryAdd,
                                  city: e.target.value,
                                },
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>Pincode</th>
                      <th className="input-box">
                        <input
                          type="text"
                          disabled={disable}
                          value={order?.deliveryAdd?.pincode}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                deliveryAdd: {
                                  ...prev.deliveryAdd,
                                  pincode: e.target.value,
                                },
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>State</th>
                      <th className="input-box">
                        <input
                          type="text"
                          disabled={disable}
                          value={order?.deliveryAdd?.state}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                deliveryAdd: {
                                  ...prev.deliveryAdd,
                                  state: e.target.value,
                                },
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>Country</th>
                      <th className="input-box">
                        <input
                          type="text"
                          disabled={disable}
                          value={order?.deliveryAdd?.country}
                          onChange={(e) => {
                            setOrder((prev) => {
                              return {
                                ...prev,
                                deliveryAdd: {
                                  ...prev.deliveryAdd,
                                  country: e.target.value,
                                },
                              };
                            });
                          }}
                        />
                      </th>
                    </tr>
                  </tbody>
                </table>

                <table border={1}>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Order Id</th>
                      <th>{order?._id}</th>
                    </tr>
                    <tr>
                      <th>Order Status</th>
                      <th style={{ padding: 0, height: "10px" }}>
                        <select
                          style={{ padding: "10px", width: "100%" }}
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>

                        <button> {order?.status}</button>
                      </th>
                    </tr>
                    <tr>
                      <th>Amount Paid</th>
                      <th>Rs.{order?.amountPaid}</th>
                    </tr>

                    <tr>
                      <th>Amount Pending</th>
                      <th>Rs.{order?.amountRemaining}</th>
                    </tr>
                    <tr>
                      <th>Total Amount</th>
                      <th>
                        Rs.
                        {Number(order?.amountPaid) +
                          Number(order?.amountRemaining)}
                      </th>
                    </tr>
                    <tr style={{ padding: 0 }}>
                      <td colSpan={2}>
                        <button
                          style={{
                            background: "black",
                            width: "100%",
                            height: "100%",
                            color: "white",
                          }}
                          onClick={updateOrder}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ padding: "25px" }}>
                <table border={1} width={"100%"}>
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((p, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <img
                              src={`${imgServer}/imgs/${p?.gallery[0]}`}
                              width={50}
                            />
                          </td>
                          <td>{p?.name}</td>
                          <td>{p?.quantity}</td>
                          <td>{p?.size}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderId;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "stylesheet",
    href: orderStyle,
  },
];
