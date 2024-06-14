import { Link } from "@remix-run/react";
import { deleteCookie } from "~/utils/cookies";
const AdminSidebar = () => {
  return (
    <div className="dash-sidebar">
      <div className="dash-logo">PieClothing</div>
      <div className="sidebar-content">
        <div className="sidebar-menu">
          <Link to={"../admin/dashboard"}>Dashboard</Link>
        </div>
        <div className="sidebar-menu">
          <Link to={"../admin/products"}>All Products</Link>
        </div>
        <div className="sidebar-menu">
          <Link to={"../admin/addproduct"}>Add New Product</Link>
        </div>
        <div className="sidebar-menu">
          <Link to={"../admin/cart"}>Carts</Link>
        </div>
        <div className="sidebar-menu">
          <Link to={"../admin/orders"}>Orders</Link>
        </div>

        <div className="sidebar-menu">
          <Link to={"../admin/users"}>Users</Link>
        </div>
        <div className="sidebar-menu">
        <a
              href="/"
              onClick={() => {
                deleteCookie("UD");
              }}
            >
              Logout
            </a>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
