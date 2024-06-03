import AdminHeader from "~/component/adminHeader";
import AdminSidebar from "~/component/adminSidebar";
import isadmin from "~/component/isadmin";
import styles from "../styles/admin.css";
import { useEffect, useState } from "react";
import { deleteOrders, getOrders } from "../controllers/orderController";
import { Link } from "@remix-run/react";
const adminOrders = () => {
  const [orderList, setOrderList] = useState();
  useEffect(() => {
    allOrders();
  }, []);

  const allOrders = async () => {
    try {
      const response = await getOrders();
      console.log("orderlist", response);

      if (response?.success) {
        setOrderList(response?.orders);
        console.log("orderlist", orderList);
      }
    } catch (err) {
      console.log("Something went wrong!");
    }
  };

  const deleteOrder = async (_id) => {
    try {
      if (confirm("Are you sure you want to delete ? ")) {
        const response = await deleteOrders(_id);
        if (response?.success) {
          alert("Order Deleted Successffully");

          setOrderList((prev) => {
            const orders = prev.filter((p) => p._id != _id);
            return orders;
          });
        } else if (response?.message == "Order Not Found") {
          alert("Order not found");
        } else {
          alert("Something went wrong");
        }
      }
    } catch (err) {}
  };

  useEffect(() => {
    console.log("orderlist", orderList);
  }, [orderList]);

  isadmin();
  return (
    <>
      <div className="dash-container">
        <AdminSidebar />
        <div className="dash-main">
          <AdminHeader />
          <div className="dash-body">
            <div className="dash-content">
              <table className="pro-table" border={1}>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Total Price</th>
                    <th>Payment Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Delete</th>
                    {/* <th>Update</th> */}
                  </tr>
                </thead>
                <tbody>
                  {orderList?.map((order, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Link to={`../admin/order/${order?._id}`}>
                            {order?.name}
                          </Link>
                        </td>
                        <td>{order?.email}</td>
                        <td>{order?.amountPaid + order?.amountRemaining}</td>
                        <td>
                          {Number(order?.amountPaid) +
                            Number(order?.amountRemaining) ==
                          Number(order?.amountPaid)
                            ? "Paid"
                            : "UnPaid"}
                        </td>
                        <td>
                          {new Date(order?.created_date).toLocaleString()}
                        </td>
                        <td>
                          {new Date(order?.updated_date).toLocaleString()}
                        </td>
                        <td width={100}>
                          <button
                            className="delete"
                            onClick={() => deleteOrder(order?._id)}
                          >
                            Delete
                          </button>
                        </td>
                        {/* <td width={100}>
                          <button className="edit" onClick={() => {}}>
                            Edit
                          </button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default adminOrders;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
