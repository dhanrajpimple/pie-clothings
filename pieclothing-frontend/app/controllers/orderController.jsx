import { postAPI } from "~/utils/api";
import { domain } from "~/utils/domain";
// all orders
export const getOrders = async () => {
  try {
    const body = {};
    return await postAPI(`${domain}/api/order/allorder`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const orderdatabyid = async (id) => {
  try {
    const body = { _id: id };
    return await postAPI(
      `${domain}/api/order/orderdatabyid`,
      JSON.stringify(body)
    );
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const updateOrderById = async (id, updatedOrder) => {
  try {
    const body = { _id: id, status:updatedOrder.status };
    return await postAPI(
      `${domain}/api/order/updateorder`,
      JSON.stringify(body)
    );
  } catch (err) {
    console.log("Something went wrong", err);
  }
};
// In orderController.js



// add order
export const addOrder = () => {
  try {
    const body = {};
    return postAPI("", body);
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

// update order
export const updateOrder = () => {
  try {
    const body = {};
    return postAPI("", body);
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

// delete order
export const deleteOrders = (id) => {
  try {
    const body = { id };
    return postAPI(`${domain}/api/order/deleteorder`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};


export const getOrdersByEmail = async (email) => {
  try {
    const response = await fetch(`${domain}/api/order/emailorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching orders:", err);
    throw err;
  }
};
