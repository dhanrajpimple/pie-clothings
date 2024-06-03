import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { isAdmin } from "~/controllers/authController";
import { getCookie } from "~/utils/cookies";

const isadmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getCookie("UD").then((res: any) => {
      // console.log(JSON.parse(res)?._id);
      checkIsAdmin(JSON.parse(res)?._id);
    });
  }, []);

  const checkIsAdmin = async (uid: any) => {
    const response: any = await isAdmin(uid);
    if (response?.success) {
      //   alert("Logged In Successfull");
    } else {
      alert("Logged In Failed");
      navigate("../");
    }
  };

  return <div>isadmin</div>;
};

export default isadmin;
