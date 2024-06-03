import Navbar from "~/component/navbar";
import Footer from "~/component/footer";
import styles from "../styles/login.css";
import { Link, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { signIn } from "../controllers/authController";
import { getCookie, setCookie } from "../utils/cookies";

const login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
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

  const signInHandle = async () => {
    if (!userData?.email || !userData?.password) {
      alert("Email and passwords are required fill");
    } else {
      const userCookie = await signIn(userData?.email, userData?.password);
      console.log(userCookie);
      if (userCookie?.success) {
        // console.log("treeeeeee  ");
        setCookie("UD", JSON.stringify(userCookie?.userDetails));

        if (userCookie?.userDetails?.AccountType == "admin") {
          navigate("../admin/dashboard");
        } else {
          navigate("../");
        }
      } else {
        console.log("falseeee  ");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-form">
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
            type="password"
          />
        </div>
        <div className="form-group">
          <button onClick={() => signInHandle()}>Login</button>
        </div>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          {" "}
          <Link to={"../resetpassword"}>Forget Password ?</Link>
        </p>

        <hr style={{ margin: "20px 0px 15px 0px" }} />

        <p style={{ textAlign: "center" }}>
          Not Registered Yet ? <br /> <br />{" "}
          <Link to={"../register"}>Register Here</Link>
        </p>
      </div>

      <Footer />
    </>
  );
};

export default login;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
