import React from 'react';
import styles from '../styles/privacy.css'
import Footer from '~/component/footer';
import Navbar from '~/component/navbar';

const Privacy = () => {
  return (
    <>
    <Navbar/>
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p>

        At PIE Clothing, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or make a purchase from us. By accessing our website or providing your personal information, you consent to the terms outlined in this Privacy Policy.
      </p>
      <h2>Collection of Personal Information:</h2>
      <ul>
        <li>We collect personal information, such as your name, email address, shipping address, and contact number, when you place an order or sign up for our newsletter.</li>
        <li>We may also collect non-personal information, such as browser type, IP address, and referring website, to enhance your browsing experience and improve our website’s functionality.</li>
      </ul>
      <h2>Use of Personal Information:</h2>
      <ul>
        <li>We use the collected personal information to process your orders, provide customer support, and communicate with you about your purchases.</li>
        <li>With your consent, we may also use your personal information to send you promotional offers, newsletters, or updates about our products and services.</li>
      </ul>
      <h2>Protection of Personal Information:</h2>
      <ul>
        <li>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration.</li>
        <li>We do not sell, trade, or rent your personal information to third parties unless required by law or with your explicit consent.</li>
      </ul>
      <h2>Cookies:</h2>
      <ul>
        <li>Our website uses cookies to enhance your browsing experience. These cookies may collect non-personal information and help us analyze website traffic and improve our services.</li>
        <li>You have the option to disable cookies in your web browser settings; however, this may affect the functionality of our website.</li>
      </ul>
      <h2>Third-Party Websites:</h2>
      <p>
        Our website may contain links to third-party websites. Please note that we have no control over their privacy practices and are not responsible for the protection and privacy of any information you provide while visiting those websites.
      </p>
      <p>
        If you have any questions or concerns regarding our Privacy Policy, please contact us at <a href="mailto:support@pieclothing.in">support@pieclothing.in</a>.
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



export default Privacy;
