import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { domain } from "~/utils/domain";

const HomeProducts = () => {
  // const loaderData: any = useLoaderData();
  const navigate: any = useNavigate();

  const [products, setProducts] = useState([
    { type: "tshirt", img: `https://pieclothing.in/cdn/shop/collections/IMG_5336.jpg?v=1706248299&width=1920` },
    { type: "hoodie", img: `https://pieclothing.in/cdn/shop/collections/IMG_5337.jpg?v=1706248318&width=1920` },
    { type: "shirt", img: `https://pieclothing.in/cdn/shop/collections/IMG_5334.jpg?v=1706248867&width=1920` },
    { type: "sweartshirt", img: `https://pieclothing.in/cdn/shop/collections/IMG_7863.jpg?v=1713849117&width=1920` },
  ]);

  return (
    <>
      <div className="hproducts">
        {products.length > 0 &&
          products.map((product: any) => {
            return (
              <div
                className="card"
                key={product.type}
                onClick={() =>
                  navigate(`./products`, {
                    replace: true,
                    relative: "path",
                    state: { ptype: product?.type },
                  })
                }
              >
                <img
                  className="product-image"
                  src={product?.img}
                  alt={product?.type}
                  loading="lazy"
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default HomeProducts;
