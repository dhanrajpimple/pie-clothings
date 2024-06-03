import { postAPI } from "~/utils/api";
import { domain } from "~/utils/domain";

export const allUserData = async () => {
  try {
    const body = {};
    return await postAPI(`${domain}/api/auth/alluser`, JSON.stringify(body));
  } catch (err) {}
};

export const deleteUserById = async (_id: any) => {
  try {
    const body = {
      _id,
    };
    return await postAPI(`${domain}/api/auth/deleteuser`, JSON.stringify(body));
  } catch (err) {
    console.log("something went wrong", err);
  }
};
