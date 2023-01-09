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

export const getBrands = async (state: React.SetStateAction<any>) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/brand");
    state(response.data);
  } catch (error) {
    return error;
  }
};

export const getReviews = async (
  state: React.SetStateAction<any>,
  id: number,
  user_id?: number
) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/reviews", {
      params: { id, user_id },
    });
    state(response.data);
  } catch (error) {
    return error;
  }
};

export const getReview = async (
  state: React.SetStateAction<any>,
  product_id: number,
  user_id: number
) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/review", {
      params: { product_id, user_id },
    });
    state(response.data);
  } catch (error) {
    return error;
  }
};

export const deleteReview = async (product_id: number, user_id: number) => {
  try {
    const response = await axios.delete("http://127.0.0.1:5000/api/review", {
      params: { product_id, user_id },
    });
  } catch (error) {
    return error;
  }
};

export const postReviews = async (
  text: string,
  product_id: number,
  user_id: number,
  value: number
) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/api/reviews", {
      text,
      product_id,
      user_id,
      value,
    });
  } catch (error) {
    return error;
  }
};

export const postAssessment = async (
  likeIt: boolean,
  reviews_id: number,
  user_id: number
) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/api/assessment", {
      likeIt,
      reviews_id,
      user_id,
    });
  } catch (error) {
    return error;
  }
};

export const postAuthorization = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/authorization",
      data,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/logout", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const postFavourite = async (product_id: number, user_id: number) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/api/favourite", {
      product_id,
      user_id,
    });
    return response;
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
