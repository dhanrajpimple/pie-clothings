import React from 'react';
import styles from  '../styles/privacy.css'; // Reuse the same CSS file for styling
import Navbar from '~/component/navbar';
import Footer from '~/component/footer';

const Refund = () => {
  return (
    <>
    <Navbar/>
    <div className="privacy-container">
      <h1>Refund Policy</h1>
      <p>
        At PIE Clothing, we want you to be completely satisfied with your purchase. We understand that sometimes items may not fit or meet your expectations. Therefore, we have outlined our exchange policy to ensure a smooth and hassle-free process:
      </p>
      <h2>Eligibility for Exchange:</h2>
      <ul>
        <li>We accept exchanges for unworn, unwashed, and undamaged items.</li>
        <li>The item must be in its original packaging with all tags and labels attached.</li>
      </ul>
      <h2>Timeframe for Exchange:</h2>
      <ul>
        <li>Exchanges must be initiated within 7 days from the date of delivery.</li>
        <li>Please contact our customer service team or email us at <a href="mailto:support@pieclothing.in">support@pieclothing.in</a> to initiate the exchange process.</li>
      </ul>
      <h2>Exchange Process:</h2>
      <ul>
        <li>Once your exchange request is approved, we will provide you with detailed instructions on how to proceed.</li>
        <li>You will be responsible for the shipping costs associated with the item.</li>
        <li>Upon receiving the returned item, we will inspect it to ensure it meets our exchange policy criteria.</li>
        <li>If the item is approved, we will process the exchange and send you the requested replacement item.</li>
      </ul>
      <h2>Exchange Options:</h2>
      <ul>
        <li>Exchanges are subject to product availability. If the requested item is not available, we will provide you with alternative options or issue store credit.</li>
      </ul>
      <h2>Refund Policy:</h2>
      <ul>
        <li>Refunds will be issued only in cases where we are unable to provide you with the product you ordered.</li>
        <li>Refunds will be processed within 7 business days upon receiving and inspecting the returned item.</li>
        <li>The refund will be issued to the original payment method used during the purchase.</li>
      </ul>
      <h2>Sale and Promotional Items:</h2>
      <ul>
        <li>Sale and promotional items are eligible for exchange, subject to availability, within the specified timeframe and meeting the exchange policy criteria.</li>
      </ul>
      <p>
        Please note that the exchange policy may be subject to change. We recommend reviewing the policy at the time of purchase or contacting our customer service team for any inquiries or clarifications regarding the exchange process.
      </p>
      <p>
        Thank you for choosing PIE Clothing. We strive to provide exceptional customer service and ensure your satisfaction with our products.
      </p>
    </div>
    <Footer/>
    </>
  );
}

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default Refund;
