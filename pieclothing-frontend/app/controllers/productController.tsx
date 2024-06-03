import { postAPI } from "~/utils/api";
import { domain } from "~/utils/domain";

// all products
export const getProducts = () => {
  try {
    const body = {};
    return postAPI(`${domain}/api/product/allproducts`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const singleProduct = async (_id: any) => {
  try {
    const body = { _id: _id };
    return await postAPI(
      `${domain}/api/product/singleproduct`,
      JSON.stringify(body)
    );
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
// add products
export const addProduct = (product: any) => {
  try {
    const body = product;
    return postAPI(`${domain}/api/product/createproduct`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const imageUpload = (images: any) => {
  try {
    const body = { images };
    return postAPI(`${domain}/api/product/createproduct`, body);
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

// update products
export const updateProduct = (product: any) => {
  try {
    const body = product;
    delete body.created_date;
    console.log("Body", body);
    return postAPI(
      `${domain}/api/product/updateproducts`,
      JSON.stringify(body)
    );
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

// delete product
export const deleteProduct = (_id: string) => {
  try {
    const body = {
      _id: _id,
    };
    return postAPI(`${domain}/api/product/deleteproduct`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};
