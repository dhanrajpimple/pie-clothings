import Navbar from "~/component/navbar";
import styles from "../styles/index.css";
import productStyles from "../styles/products.css"
import Hero from "~/component/hero";
import video from '../assests/video.mp4'
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
      <video
        src={video}
        title="Local video player"
        
        autoPlay
        muted
        width="100%"
        height="auto"
      ></video>
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
