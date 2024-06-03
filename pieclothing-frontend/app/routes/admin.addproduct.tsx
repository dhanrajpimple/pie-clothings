import AdminHeader from "~/component/adminHeader";
import styles from "../styles/admin.css";
import AdminSidebar from "~/component/adminSidebar";
import { useEffect, useState } from "react";
import { addProduct, imageUpload } from "~/controllers/productController";
import isadmin from "~/component/isadmin";
import { imageUploadAPI } from "~/utils/api";
import { imgServer } from "~/utils/domain";
import { Editor } from "primereact/editor";

const AdminAddProduct = () => {
  isadmin();

  const [productForm, setProductForm] = useState({
    name: "",
    category: [],
    description: "",
    washcare: "",
    type: "",
    size: [],
    color: [],
    price: 0,
    offerPrice: 0,
    gallery: [],
    seo_title: "",
    seo_description: "",
    seo_keywords: [],
  });
  const [productCategory, setProductCategory] = useState("");
  const [size, setSize] = useState({
    size: "",
    quantity: 0,
  });
  const [color, setColor] = useState("");
  const [seo_keywords, setSeo_Keyword] = useState("");

  useEffect(() => {
    console.log(productForm);
  }, [productForm]);

  const addImg = async (e: any) => {
    const formData = new FormData();

    const ee = e.target.files;
    console.log("eeee", ee);

    for (let i = 0; i < ee.length; i++) {
      formData.append("images", e.target.files[i]);
    }

    const response: any = await imageUploadAPI(
      `${imgServer}/api/product/uploadimg`,
      formData
    );
    console.log(response);
    if (response.success) {
      setProductForm((prev: any) => {
        return {
          ...prev,
          gallery: [...prev.gallery, ...response?.filename],
        };
      });
    }
    console.log("Response", response);
  };

  const addPro = async () => {
    try {
      if (productForm?.name && productForm?.price) {
        const response: any = await addProduct(productForm);
        console.log(response);
        if (response?.success) {
          alert("Product Added Successfully");
        } else {
          alert("Something went wrong");
        }
      } else {
        alert("Product Name and price are required fields");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    console.log(size);
  }, [size]);

  return (
    <>
      <div className="dash-container">
        <AdminSidebar />
        <div className="dash-main">
          <AdminHeader />
          <div className="dash-body">
            <div className="dash-content">
              <div className="pro-form">
                <div className="input-box">
                  <label>Product Name: </label>
                  <input
                    placeholder="Product Name"
                    type="text"
                    onChange={(e) =>
                      setProductForm((prev: any) => {
                        return {
                          ...prev,
                          name: e.target.value,
                        };
                      })
                    }
                  />
                </div>
                <div className="input-box">
                  <label>Category: </label>
                  <div className="input-flex">
                    <input
                      placeholder="Category"
                      type="text"
                      onChange={(e) => {
                        setProductCategory(e.target.value);
                      }}
                      value={productCategory}
                    />
                    <button
                      className="pro-form-btn"
                      onClick={() => {
                        productCategory.length > 0 &&
                          setProductForm((prev: any) => {
                            const newFormData = {
                              ...prev,
                              category: [...prev.category, productCategory],
                            };
                            setProductCategory("");
                            return newFormData;
                          });
                      }}
                    >
                      Add
                    </button>
                  </div>
                  {productForm?.category.length > 0 && (
                    <p className="tags-name">
                      {productForm?.category.length > 0 &&
                        productForm?.category.map((cat: any, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => {
                                setProductForm((prev: any) => {
                                  const newCat = prev.category.filter(
                                    (c: any) => c != cat
                                  );
                                  return {
                                    ...prev,
                                    category: newCat,
                                  };
                                });
                              }}
                            >
                              {cat}
                            </span>
                          );
                        })}
                    </p>
                  )}
                </div>
                <div className="input-box">
                  <label>Product Type: </label>
                  <input
                    placeholder="Product Type"
                    type="text"
                    onChange={(e) =>
                      setProductForm((prev: any) => {
                        return {
                          ...prev,
                          type: e.target.value,
                        };
                      })
                    }
                  />
                </div>
                <div className="input-box">
                  <label>Image Upload</label>
                  <input
                    type="file"
                    name="images"
                    onChange={(e: any) => addImg(e)}
                    multiple
                  />
                  {productForm?.gallery.length > 0 &&
                    productForm?.gallery.map((img: any) => {
                      console.log(img);
                      return (
                        <img
                          key={img}
                          onClick={() => {
                            confirm("Are you sure you want to delete  ?") &&
                              setProductForm((prev: any) => {
                                const newImg = prev.gallery.filter(
                                  (g: any) => g != img
                                );
                                return {
                                  ...prev,
                                  gallery: newImg,
                                };
                              });
                          }}
                          src={`${imgServer}/imgs/${img}`}
                          width="100"
                        />
                      );
                    })}
                </div>
                <div className="input-box">
                  <label
                    style={{ display: "block", padding: "0px 0px 5px 5px" }}
                  >
                    Description:{" "}
                  </label>
                  <Editor
                    value={productForm?.description}
                    onTextChange={(e) =>
                      setProductForm((prev: any) => {
                        return { ...prev, description: e.htmlValue };
                      })
                    }
                    style={{ height: "200px" }}
                  />
                </div>
                <div className="input-box">
                  <label
                    style={{ display: "block", padding: "10px 0px 5px 5px" }}
                  >
                    Wash Care:{" "}
                  </label>
                  <Editor
                    value={productForm?.washcare}
                    onTextChange={(e) =>
                      setProductForm((prev: any) => {
                        return { ...prev, washcare: e.htmlValue };
                      })
                    }
                    style={{ height: "200px" }}
                  />
                </div>
                <div className="input-box">
                  <label>Size: </label>
                  <div className="input-flex">
                    <input
                      placeholder="Size"
                      type="text"
                      onChange={(e) => {
                        setSize((prev: any) => {
                          return { ...prev, size: e.target.value };
                        });
                      }}
                      value={size?.size}
                      style={{ width: "44%" }}
                    />{" "}
                    <input
                      placeholder="Quantity"
                      type="text"
                      onChange={(e) => {
                        setSize((prev: any) => {
                          return { ...prev, quantity: e.target.value };
                        });
                      }}
                      style={{ width: "44%" }}
                      value={size?.quantity}
                    />
                    <button
                      className="pro-form-btn"
                      onClick={() => {
                        const newSize = [...productForm.size, size];
                        console.log("newSize", newSize);

                        setProductForm((prev: any) => {
                          return {
                            ...prev,
                            size: newSize,
                          };
                        });
                        setSize({
                          size: "",
                          quantity: 0,
                        });
                      }}
                    >
                      Add
                    </button>
                  </div>
                  {productForm?.size.length > 0 && (
                    <table
                      border={1}
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      <thead>
                        <tr>
                          <th>Size</th>
                          <th>Quantity</th>
                          <th>X</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productForm?.size.map((size: any, index) => {
                          return (
                            // <div key={index}>
                            //   <span
                            //     onClick={() => {
                            //       setProductForm((prev: any) => {
                            //         const newSize = prev.size.filter(
                            //           (s: any) => s != size
                            //         );
                            //         return {
                            //           ...prev,
                            //           size: newSize,
                            //         };
                            //       });
                            //     }}
                            //   >
                            <tr key={index}>
                              <td>{size?.size}</td>
                              <td>{size?.quantity}</td>
                              <td
                                onClick={() => {
                                  setProductForm((prev: any) => {
                                    const newSize = prev.size.filter(
                                      (s: any) => s != size
                                    );
                                    return {
                                      ...prev,
                                      size: newSize,
                                    };
                                  });
                                }}
                              >
                                X
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="input-box">
                  <label>Color: </label>
                  <div className="input-flex">
                    <input
                      placeholder="Color"
                      type="text"
                      onChange={(e) => {
                        setColor(e.target.value);
                      }}
                      value={color}
                    />
                    <button
                      className="pro-form-btn"
                      onClick={() => {
                        color.length > 0 &&
                          setProductForm((prev: any) => {
                            const newFormData = {
                              ...prev,
                              color: [...prev.color, color],
                            };
                            setColor("");
                            return newFormData;
                          });
                      }}
                    >
                      Add
                    </button>
                  </div>
                  {productForm?.color.length > 0 && (
                    <p className="tags-name">
                      {productForm?.color.length > 0 &&
                        productForm?.color.map((color: any, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => {
                                setProductForm((prev: any) => {
                                  const newColor = prev.color.filter(
                                    (c: any) => c != color
                                  );
                                  return {
                                    ...prev,
                                    color: newColor,
                                  };
                                });
                              }}
                            >
                              {color}
                            </span>
                          );
                        })}
                    </p>
                  )}
                </div>
                <div className="input-box">
                  <label>Price: </label>
                  <input
                    placeholder="Price"
                    type="number"
                    onChange={(e) =>
                      setProductForm((prev) => {
                        return {
                          ...prev,
                          price: Number(e.target.value),
                        };
                      })
                    }
                  />
                </div>
                <div className="input-box">
                  <label>Offer Price: </label>
                  <input
                    placeholder="Offer Price"
                    type="number"
                    onChange={(e) =>
                      setProductForm((prev) => {
                        return {
                          ...prev,
                          offerPrice: Number(e.target.value),
                        };
                      })
                    }
                  />
                </div>
                <div className="input-box">
                  <label>SEO Title: </label>
                  <input
                    placeholder="SEO Title"
                    type="text"
                    onChange={(e) =>
                      setProductForm((prev) => {
                        return {
                          ...prev,
                          seo_title: e.target.value,
                        };
                      })
                    }
                  />
                </div>
                <div className="input-box">
                  <label>SEO Description: </label>
                  <input
                    placeholder="SEO Description"
                    type="text"
                    onChange={(e) =>
                      setProductForm((prev) => {
                        return {
                          ...prev,
                          seo_description: e.target.value,
                        };
                      })
                    }
                  />
                </div>
                <div className="input-box">
                  <label>SEO Keywords: </label>
                  <div className="input-flex">
                    <input
                      placeholder="SEO Keywords"
                      type="text"
                      onChange={(e) => {
                        setSeo_Keyword(e.target.value);
                      }}
                      value={seo_keywords}
                    />
                    <button
                      className="pro-form-btn"
                      onClick={() => {
                        seo_keywords.length > 0 &&
                          setProductForm((prev: any) => {
                            const newFormData = {
                              ...prev,
                              seo_keywords: [
                                ...prev.seo_keywords,
                                seo_keywords,
                              ],
                            };
                            setSeo_Keyword("");
                            return newFormData;
                          });
                      }}
                    >
                      Add
                    </button>
                  </div>
                  {productForm?.seo_keywords.length > 0 && (
                    <p className="tags-name">
                      {productForm?.seo_keywords.length > 0 &&
                        productForm?.seo_keywords.map((keyword: any, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => {
                                setProductForm((prev: any) => {
                                  const newKeyword = prev.seo_keywords.filter(
                                    (k: any) => k != keyword
                                  );
                                  return {
                                    ...prev,
                                    seo_keywords: newKeyword,
                                  };
                                });
                              }}
                            >
                              {keyword}
                            </span>
                          );
                        })}
                    </p>
                  )}
                </div>
                <button className="submit-btn" onClick={() => addPro()}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAddProduct;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
