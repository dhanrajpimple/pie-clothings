import React from 'react';
import styles from  '../styles/privacy.css'; // Reuse the same CSS file for styling
import Navbar from '~/component/navbar';
import Footer from '~/component/footer';

const shoping = () => {
  return (
    <>
    <Navbar/>
    <div className="privacy-container">
      <h1>Shipping Policy</h1>
      <p>
        At PIE Clothing, we strive to provide you with a seamless shopping experience. Please read our Shipping & Return Policy carefully before making a purchase. By placing an order, you agree to comply with the terms outlined below.
      </p>
      <h2>Shipping:</h2>
      <h3>Shipping Availability:</h3>
      <ul>
        <li>We offer shipping services within India. Unfortunately, we do not currently ship internationally.</li>
      </ul>
      <h3>Shipping Timeframe:</h3>
      <ul>
        <li>Orders are typically processed and dispatched within 24 hours from the date of purchase, excluding weekends and holidays.</li>
        <li>Estimated delivery times may vary depending on your location and the shipping carrier. Please refer to the shipping details provided during checkout.</li>
      </ul>
      <h3>Shipping Charges:</h3>
      <ul>
        <li>Shipping charges are calculated based on the weight, dimensions, and destination of the package. The applicable shipping charges will be displayed at the time of checkout.</li>
      </ul>
      <h2>Returns:</h2>
      <h3>Return Eligibility:</h3>
      <ul>
        <li>We accept returns only in the event that we are unable to provide you with the product you ordered.</li>
        <li>All other sales are final, and we do not offer returns or refunds for purchased products, unless there is a fulfillment error on our part.</li>
      </ul>
      <h3>Return Process:</h3>
      <ul>
        <li>If we are unable to fulfill your order due to product unavailability or any other exceptional circumstances, we will contact you to discuss the available options, including a refund.</li>
        <li>To request a return or report a fulfillment error, please contact our customer support team at <a href="mailto:Support@pieclothing.in">Support@pieclothing.in</a> within 48 hours of receiving your order.</li>
      </ul>
      <h3>Return Shipping:</h3>
      <ul>
        <li>In the case of a fulfillment error on our part, we will provide you with a prepaid return label to send the item back to us.</li>
        <li>Please follow the return instructions provided by our customer support team to ensure a smooth return process.</li>
      </ul>
      <p>
        Please note that any items returned must be unused, unworn, and in their original packaging, including all tags and labels.
      </p>
      <p>
        If you have any questions or concerns regarding our Shipping & Return Policy, please contact us at <a href="mailto:support@pieclothing.in">support@pieclothing.in</a>.
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

export default  shoping;
