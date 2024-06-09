import Footer from "~/component/footer";
import Navbar from "~/component/navbar";
import styles from "~/styles/orders.css";
import { getCookie } from "../utils/cookies";
import { useEffect, useState } from "react";
import { getOrdersByEmail } from "~/controllers/orderController";
import { useNavigate } from "@remix-run/react";
import { imgServer } from "~/utils/domain";
import { submitReview } from "~/controllers/reviewController"; // You need to create this controller
import { generateInvoicePDF } from "../component/invoice"; // Utility to generate invoice

const Orders = () => {
  const [email, setEmail] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [productId, setProductId] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserEmail();
  }, []);

  useEffect(() => {
    if (email) {
      fetchOrdersByEmail(email);
    }
  }, [email]);

  const fetchUserEmail = async () => {
    try {
      const res = await getCookie("UD");
      if (res) {
        const userDetails = JSON.parse(res);
        if (userDetails?.email) {
          setEmail(userDetails.email);
          setUserId(userDetails._id);
        } else {
          throw new Error("Email not found in cookie");
        }
      } else {
        throw new Error("User cookie not found");
      }
    } catch (err) {
      console.error("Error fetching user email:", err);
    }
  };

  const fetchOrdersByEmail = async (email) => {
    try {
      const response = await getOrdersByEmail(email);
      if (response) {
        setOrderList(response.orders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleReviewSubmit = async () => {
    if (!selectedProduct) return;

    const reviewData = {
      productId: productId,
      userId: userId, 
      rating,
      comment,
    };

    try {
      await submitReview(reviewData);
      alert("Review submitted successfully!");
      setSelectedProduct(null);
      setRating(0);
      setComment("");
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const handleReviewButtonClick = (product) => {
    setSelectedProduct(product);
    setProductId(product.productId);
  };

  const handleDownloadInvoice = (order) => {
    console.log(order, "this is product data for me")
    generateInvoicePDF(order, email);
  };

  return (
    <>
      <Navbar />
      <div className="orders">
        <table border={0}>
          <thead>
            <tr>
              <th>Index</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Image</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList.length > 0
              ? orderList.map((order, orderIndex) =>
                  order.products.map((product, productIndex) => (
                    <tr key={`${orderIndex}-${productIndex}`}>
                      <td>{orderIndex + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.size}</td>
                      <td>
                        <img
                          src={`${imgServer}/imgs/${product.gallery[0]}`}
                          alt={product.name}
                          width={50}
                        />
                      </td>
                      <td>{order.status}</td>
                      <td >
                        {order.status === "Completed" && (
                          <>
                            <button
                              onClick={() => handleReviewButtonClick(product)}
                            >
                              Review
                            </button>
                            <button
                              onClick={() => handleDownloadInvoice(order)}
                            >
                               Invoice
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )
              : null}
          </tbody>
        </table>

        {selectedProduct && (
          <div className="review-form">
            <h3>Review Product: {selectedProduct.name}</h3>
            <div className="review-main">
              <label>
                Rating (out of 5): 
              </label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                max="5"
                min="1"
              />
            </div>
            <div className="review-main">
              <label>
                Comment:
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button onClick={handleReviewSubmit}>Submit Review</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Orders;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
