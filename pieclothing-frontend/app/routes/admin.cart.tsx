import AdminHeader from "~/component/adminHeader";
import AdminSidebar from "~/component/adminSidebar";
import isadmin from "~/component/isadmin";
import styles from "../styles/admin.css";
import { useEffect, useState } from "react";
import { deleteCartById, viewAllCart } from "~/controllers/cartController";

const adminCart = () => {
  isadmin();

  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    allCart();
  }, []);

  const allCart = async () => {
    const response: any = await viewAllCart("");
    if (response.success) {
      console.log("response", response);

      let cartU = response.cartDetails;
      cartU.map((c: any) => {
        let totalQuantity = 0;
        c.products.forEach((p: any) => {
          console.log(p, totalQuantity);
          totalQuantity = totalQuantity + p.quantity;
        });
        c.totalQuantity = totalQuantity;
      });
      console.log("cartU", cartU);
      setCartDetails(cartU);
    }
  };

  const deleteFromCart = async (id: any) => {
    const response: any = await deleteCartById(id);
    if (response.success) {
      setCartDetails((prev: any) => {
        const cartU = prev.filter((p: any) => p._id != id);
        return cartU;
      });
      alert("succes");
    } else {
      alert("failed");
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
              <div className="table">
                <table className="pro-table" border={1}>
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Total Items</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetails?.length > 0
                      ? cartDetails.map((cart: any, i) => {
                          return (
                            <tr key={cart?._id}>
                              <td>{i + 1}</td>
                              <td>
                                {cart?.userDetails
                                  ? cart.userDetails.firstName +
                                    " " +
                                    cart.userDetails.lastName
                                  : "Unknown"}
                              </td>
                              <td>
                                {cart?.userDetails?.email
                                  ? cart?.userDetails?.email
                                  : "Unknown"}
                              </td>
                              <td>{cart?.totalQuantity}</td>
                              <td>
                                {new Date(cart?.created_date).toLocaleString()}
                              </td>
                              <td>
                                {new Date(cart?.updated_date).toLocaleString()}
                              </td>
                              <td width={100}>
                                <button
                                  className="delete"
                                  onClick={() => {
                                    confirm("Are you sure ?")
                                      ? deleteFromCart(cart?._id)
                                      : null;
                                  }}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      : null}
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

export default adminCart;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
