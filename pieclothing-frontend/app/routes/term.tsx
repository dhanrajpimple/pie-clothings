import React from 'react';
import styles from  '../styles/privacy.css'; // Reuse the same CSS file for styling
import Navbar from '~/component/navbar';
import Footer from '~/component/footer';

const term = () => {
  return (
    <>
    <Navbar/>
    <div className="privacy-container">
      <h1>Terms of Service</h1>
      <p>
        Welcome to PIE Clothing! These Terms & Conditions outline the rules and regulations for the use of our website. By accessing or using our website, you accept and agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, please refrain from using our website.
      </p>
      <h2>Intellectual Property:</h2>
      <ul>
        <li>All content on our website, including text, images, logos, and graphics, is protected by intellectual property rights and is the property of Episodes Store.</li>
        <li>You may not use, reproduce, modify, or distribute any content from our website without our prior written consent.</li>
      </ul>
      <h2>Use of Website:</h2>
      <ul>
        <li>You must be at least 18 years old or have the legal consent of a parent or guardian to use our website.</li>
        <li>You agree to use our website for lawful purposes and in a manner that does not violate any applicable laws or regulations.</li>
      </ul>
      <h2>Product Information:</h2>
      <ul>
        <li>We strive to provide accurate and up-to-date product information on our website. However, we do not warrant the completeness, accuracy, or reliability of the information.</li>
        <li>Product images are for illustrative purposes only and may differ slightly from the actual product.</li>
      </ul>
      <h2>Pricing and Payments:</h2>
      <ul>
        <li>All prices on our website are listed in Indian Rupees (INR) and are subject to change without prior notice.</li>
        <li>We accept various payment methods, and by making a purchase, you agree to the terms and conditions of the respective payment provider.</li>
      </ul>
      <h2>Third-Party Links:</h2>
      <ul>
        <li>Our website may contain links to third-party websites. These links are provided for your convenience and do not signify our endorsement of those websites.</li>
        <li>We have no control over the content or practices of third-party websites and disclaim any responsibility for them.</li>
      </ul>
      <h2>Limitation of Liability:</h2>
      <ul>
        <li>In no event shall Episodes Store or its affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our website or products.</li>
        <li>We make no representations or warranties of any kind, express or implied, regarding the operation or availability of our website or the content, products, or services provided.</li>
      </ul>
      <h2>Indemnification:</h2>
      <ul>
        <li>You agree to indemnify and hold Episodes Store and its affiliates harmless from any claims, losses, damages, liabilities, costs, or expenses arising from your use of our website or violation of these Terms & Conditions.</li>
      </ul>
      <h2>Governing Law and Jurisdiction:</h2>
      <ul>
        <li>These Terms & Conditions are governed by the laws of India. Any disputes arising from or relating to these terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.</li>
      </ul>
      <h2>Severability:</h2>
      <ul>
        <li>If any provision of these Terms & Conditions is found to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable to the fullest extent permitted by law.</li>
      </ul>
      <p>
        If you have any questions or concerns regarding our Terms & Conditions, please contact us at <a href="mailto:support@pieclothing.in">support@pieclothing.in</a>.
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

export default  term;
