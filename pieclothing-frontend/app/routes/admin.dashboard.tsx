import AdminHeader from "~/component/adminHeader";
import styles from "../styles/admin.css";
import AdminSidebar from "~/component/adminSidebar";
import isadmin from "~/component/isadmin";
import { viewAllCart } from "~/controllers/cartController";
import { useEffect, useState } from "react";
// import { allUserData } from "~/controllers/userController";
const AdminDashboard = () => {
  isadmin();

  const [data, setData] = useState({
    allCart: 0,
    knownCart: 0,
    unKnownCart: 0,
    user: 0,
  });

  useEffect(() => {
    allCart();
    // allUser();
  }, []);

  // const allUser = async () => {
  //   const response: any = await allUserData();
  //   if (response?.success) {
  //     setData((prev) => {
  //       return {
  //         ...prev,
  //         user: response.userData.length,
  //       };
  //     });
  //   }
  // };

  const allCart = async () => {
    const response: any = await viewAllCart("");
    if (response.success) {
      console.log("response", response);
      let knownCart = 0;
      let unKnownCart = 0;
      response.cartDetails.forEach((cd: any) => {
        if (cd?.userDetails) {
          knownCart = knownCart + 1;
        } else {
          unKnownCart = unKnownCart + 1;
        }
      });
      setData((prev) => {
        return {
          ...prev,
          allCart: response.cartDetails.length,
          knownCart,
          unKnownCart,
        };
      });
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
              <div className="dash-ana">
                <div className="ana-box">
                  <div className="ana-no">100</div>
                  <div className="ana-title">Orders</div>
                </div>
                <div className="ana-box">
                  <div className="ana-no">100</div>
                  <div className="ana-title">In Progress</div>
                </div>
                <div className="ana-box">
                  <div className="ana-no">100</div>
                  <div className="ana-title">Pending</div>
                </div>
                <div className="ana-box">
                  <div className="ana-no">100</div>
                  <div className="ana-title">Completed</div>
                </div>
                <div className="ana-box">
                  <div className="ana-no">{data?.allCart}</div>
                  <div className="ana-title">Cart</div>
                </div>

                <div className="ana-box">
                  <div className="ana-no">{data?.knownCart}</div>
                  <div className="ana-title">Known Cart</div>
                </div>
                <div className="ana-box">
                  <div className="ana-no">{data?.unKnownCart}</div>
                  <div className="ana-title">Unknown Cart</div>
                </div>

                {/* <div className="ana-box">
                  <div className="ana-no">{data?.user}</div>
                  <div className="ana-title">Users</div>
                </div>
                <div className="ana-box">
                  <div className="ana-no">100</div>
                  <div className="ana-title">Products</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
