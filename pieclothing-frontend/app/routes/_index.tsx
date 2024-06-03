import Navbar from "~/component/navbar";
import styles from "../styles/index.css";
import productStyles from "../styles/products.css"
import Hero from "~/component/hero";
// import Products from "~/component/products";
import { getProducts } from "~/controllers/productController";
import HomeProducts from "~/component/homeProducts";
import Footer from "~/component/footer"
const _index = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <HomeProducts />

      <div className="gs-vdo">
        <iframe src="https://www.youtube.com/embed/9Pbe4DyMQYw?si=SoWUfS1wltLZWQAb" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
      </div>

      {/* <Products /> */}

      <Footer />
    </>
  );
};

export default _index;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "stylesheet",
    href: productStyles
  }
];

export const loader = async () => {
  try {
    return await getProducts();
  } catch (e) {
    return { message: "something went wrong" };
  }
};
