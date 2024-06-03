import { postAPI } from "~/utils/api";
import { domain } from "~/utils/domain";

// Sign In
export const signIn = async (email: string, password: string) => {
  try {
    const body = { email, password };
    return await postAPI(`${domain}/api/auth/login`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
    return "Something went wrong";
  }
};

export const signUp = async (
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  password: string
) => {
  try {
    const body = { firstName, lastName, phone, email, password };
    return await postAPI(`${domain}/api/auth/signup`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
    return "Something went wrong";
  }
};

//is admin
export const isAdmin = async (uid: any) => {
  try {
    const body = { uid };
    return await postAPI(`${domain}/api/auth/isadmin`, JSON.stringify(body));
  } catch (err) {}
};


export const resetPassSendOTP = async (email) => {
  try {
    const body = { email };
    return await postAPI(
      `${domain}/api/auth/resetpasssendotp`,
      JSON.stringify(body)
    );
  } catch (error) {
    console.log(error);
  }
};
export const verifyOTP = async (email, otp, password) => {
  try {
    const body = { email, otp, password };
    return await postAPI(`${domain}/api/auth/verifyotp`, JSON.stringify(body));
  } catch (error) {
    console.log(error);
  }
};
