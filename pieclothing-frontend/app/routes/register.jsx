import Navbar from "~/component/navbar";
import Footer from "~/component/footer";
import styles from "../styles/login.css";
import { Link, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { signUp } from "../controllers/authController";
import { getCookie, setCookie } from "../utils/cookies";

const register = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    getCookie("UD").then((res) => {
      if (res) {
        console.log("res", res);
        navigate("../");
      }
    });
  }, []);

  const signUpHandle = async () => {
    if (
      !userData?.firstName ||
      !userData?.lastName ||
      !userData?.phone ||
      !userData?.email ||
      !userData?.password
    ) {
      alert("All fields are required ");
    } else {
      const response = await signUp(
        userData?.firstName,
        userData?.lastName,
        userData?.phone,
        userData?.email,
        userData?.password
      );

      if (response?.success) {
        navigate("../login");
      }

      console.log("response", response);
      //   if (userCookie?.success) {
      //     // console.log("treeeeeee  ");
      //     setCookie("userCookie", JSON.stringify(userCookie?.userDetails));
      //     navigate("../");
      //   } else {
      //     console.log("falseeee  ");
      //   }
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-form">
        <div className="form-group">
          <p>First Name*: </p>
          <input
            onChange={(e) =>
              setUserData((prev) => {
                return {
                  ...prev,
                  firstName: e.target.value,
                };
              })
            }
            type="text"
          />
        </div>
        <div className="form-group">
          <p>Last Name*: </p>
          <input
            onChange={(e) =>
              setUserData((prev) => {
                return {
                  ...prev,
                  lastName: e.target.value,
                };
              })
            }
            type="text"
          />
        </div>
        <div className="form-group">
          <p>Phone*: </p>
          <input
            onChange={(e) =>
              setUserData((prev) => {
                return {
                  ...prev,
                  phone: e.target.value,
                };
              })
            }
            type="text"
          />
        </div>
        <div className="form-group">
          <p>Email*: </p>
          <input
            onChange={(e) =>
              setUserData((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              })
            }
            type="email"
          />
        </div>
        <div className="form-group">
          <p>Password*: </p>
          <input
            onChange={(e) =>
              setUserData((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              })
            }
            type="text"
          />
        </div>

        <div className="form-group">
          <button onClick={() => signUpHandle()}>Register</button>
        </div>

        <hr style={{ margin: "20px 0px 15px 0px" }} />

        <p style={{ textAlign: "center" }}>
          Already Registered ? <br /> <br />{" "}
          <Link to={"../login"}>Login Here</Link>
        </p>
      </div>

      <Footer />
    </>
  );
};

export default register;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
