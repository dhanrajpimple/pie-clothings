import AdminSidebar from "~/component/adminSidebar";
import styles from "../styles/admin.css";
import AdminHeader from "~/component/adminHeader";
import { deleteProduct, getProducts } from "~/controllers/productController";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import isadmin from "~/component/isadmin";

const AdminProducts = () => {
  isadmin();
  const loaderData: any = useLoaderData();
  const navigate: any = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      if (loaderData?.products) {
        console.log(loaderData?.products);
        setProducts(loaderData?.products);
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  }, [loaderData]);

  const navigateToEdit = (_id: any) => {
    navigate("/admin/editproduct", {
      replace: true,
      relative: "path",
      state: { _id: _id },
    });
  };

  const deletePro = async (_id: any) => {
    try {
      const sure = confirm("Are you sure you want to delete this product?");
      if (sure) {
        const response: any = await deleteProduct(_id);
        if (response?.success) {
          setProducts((prev: any) => {
            const updatedProduct = prev.filter((item: any) => item?._id != _id);
            return updatedProduct;
          });
          alert("Product Deleted Successfully");
        } else {
          alert(`${response?.message}`);
        }
      }
    } catch (error) {
      console.log("Something went wrong", error);
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
              <table className="pro-table" border={1}>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Delete</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 &&
                    products.map((product: any, index) => {
                      return (
                        <tr key={product?._id}>
                          <td width={10}>{index + 1}</td>
                          <td onClick={() => navigateToEdit(product?._id)}>
                            {product?.name}
                          </td>
                          <td>{product?.type}</td>
                          <td className="pro-price">
                            {product?.offerPrice > 0 ? (
                              <>
                                Rs.
                                {product?.offerPrice}{" "}
                                <span>Rs.{product?.price}</span>
                              </>
                            ) : (
                              <>Rs.{product?.price}</>
                            )}
                          </td>
                          <td>
                            {new Date(product?.created_date).toLocaleString()}
                          </td>
                          <td>
                            {new Date(product?.updated_date).toLocaleString()}
                          </td>
                          <td width={100}>
                            <button
                              className="delete"
                              onClick={() => deletePro(product?._id)}
                            >
                              Delete
                            </button>
                          </td>
                          <td width={100}>
                            <button
                              className="edit"
                              onClick={() => navigateToEdit(product?._id)}
                            >
                              Edit
                            </button>
                            {/* </Form> */}
                          </td>
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

export default AdminProducts;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const loader = async () => {
  try {
    return await getProducts();
  } catch (e) {
    return { message: "something went wrong" };
  }
};
