import { postAPI } from "~/utils/api";
import { domain } from "~/utils/domain";

export const addCart = (cart: any) => {
  try {
    const { pid, uid, tempUid, size, color } = cart;

    console.log(
      "pid, uid, tempUid, size, color",
      pid,
      uid,
      tempUid,
      size,
      color
    );
    const body = {
      pid,
      uid,
      tempUid,
      size,
      color,
    };
    return postAPI(`${domain}/api/cart/addtocart`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const viewCart = (uid: string) => {
  try {
    return postAPI(`${domain}/api/cart/viewcart`, JSON.stringify({ uid }));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const viewCartByID = (id: string) => {
  try {
    return postAPI(`${domain}/api/cart/viewcart`, JSON.stringify({ id }));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const viewCartByCartId = (_id: string) => {
  try {
    return postAPI(
      `${domain}/api/cart/viewcartbycartid`,
      JSON.stringify({ _id })
    );
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const deleteCart = (
  uid: string,
  pid: string,
  size: string = "",
  quantity: string = ""
) => {
  try {
    const body = {
      uid,
      pid,
      size,
      quantity,
    };
    console.log(body);
    return postAPI(`${domain}/api/cart/deletecart`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const viewAllCart = (uid: string) => {
  try {
    return postAPI(`${domain}/api/cart/viewAllCart`, uid);
  } catch (err) {
    console.log("Somethting went wrong", err);
  }
};

export const deleteCartById = (id: string) => {
  try {
    const body = {
      id,
    };
    console.log(body);
    return postAPI(
      `${domain}/api/cart/deletecartbyidadmin`,
      JSON.stringify(body)
    );
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const deleteCart1 = (id: string) => {
  try {
    const body = {
      cartId: id,
    };
    console.log(body);
    return postAPI(
      `${domain}/api/cart/deletecartbyorder`,
      JSON.stringify(body)
    );
  } catch (err) {
    console.log("Something went wrong", err);
  }
};