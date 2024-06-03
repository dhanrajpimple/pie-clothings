import styles from "../styles/thankyou.css";
import { Link } from "@remix-run/react";

const ThankYou = () => {
  return (
    <div className="thankyou">
      <p>Thank You For Ordering</p>
      <p>
        You can manage your orders from <Link>here</Link>{" "}
      </p>
    </div>
  );
};

export default ThankYou;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
