export const postAPI = (url: string, body: any) => {
  try {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
      // body: JSON.stringify(body)
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log("Error from postApi", error);
        return error;
      });
  } catch (e) {
    console.log("Error from postApi", e);
    return e;
  }
};

export const getAPI = (url: string) => {
  try {
    return fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.log("Error from postApi", e);
        return e;
      });
  } catch (e) {
    console.log("Error from getAPI", e);
    return e;
  }
};

export const imageUploadAPI = async (url: string, selectedFile: any) => {
  try {
    // const formData = new FormData();
    // formData.append("images", selectedFile);

    return await fetch(`${url}`, {
      method: "POST",
      body: selectedFile,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log("Error from postApi", error);
        return error;
      });
  } catch (e) {
    console.log("Error from postApi", e);
    return e;
  }
};
