import Products from "~/component/products";
import { getProducts } from "~/controllers/productController";
import Styles from "../styles/products.css";
import Navbar from "~/component/navbar";
import Footer from "~/component/footer";
import { useLocation } from "@remix-run/react";
const product = () => {
  const location = useLocation();
  const ptype = location.state;
  return (
    <>
      <Navbar />
      {/* <div style={{ background: '#D6D7DB', height: '200px' }}>
        <h2 style={{ textAlign: 'center', paddingTop: '100px', fontSize: '36px', color: 'white' }}>All Products</h2>
      </div> */}
      <Products ptype={ptype} />
      <Footer />
    </>
  );
};

export default product;

export const loader = async () => {
  try {
    return await getProducts();
  } catch (e) {
    return { message: "something went wrong" };
  }
};

export const links = () => [
  {
    rel: "stylesheet",
    href: Styles,
  },
];
