import axios from "axios";

export const postRegistration = async (data: {
  username: string;
  email: string;
  password: string;
  secondPassword: string;
}) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/registration",
      {
        ...data,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postAuthorization = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/authorization",
      data,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postCategory = (parent_id: number | null, name: string) => {
  axios.post("http://127.0.0.1:5000/api/admin/category", {
    name: name,
    parent_id,
  });
};

export const deleteCategory = (id: number) => {
  axios.delete("http://127.0.0.1:5000/api/admin/category", {
    params: {
      id,
    },
  });
};

export const postProduct = (formData: any) => {
  axios.post("http://127.0.0.1:5000/api/admin/product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProduct = (id: number) => {
  axios.delete("http://127.0.0.1:5000/api/admin/product", {
    params: {
      id,
    },
  });
};

export const putProduct = (formData: any) => {
  axios.put("http://127.0.0.1:5000/api/admin/product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProductImg = (id: number) => {
  axios.delete("http://127.0.0.1:5000/api/admin/product/image", {
    params: {
      id,
    },
  });
};
