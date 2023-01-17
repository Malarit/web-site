import axios from "axios";
import { ifetchProducts } from "../store/slices/product/types";

export const getProduct = async (
  state: React.SetStateAction<any>,
  props: ifetchProducts
) => {
  try {
    const response = await axios.get("/api/product", {
      params: {
        ...props,
      },
    });
    state(response.data);
  } catch (error) {
    return error;
  }
};

export const postRegistration = async (data: {
  username: string;
  email: string;
  password: string;
  secondPassword: string;
}) => {
  try {
    const response = await axios.post(
      "/api/registration",
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
    const response = await axios.get("/api/brand");
    state(response.data);
  } catch (error) {
    return error;
  }
};

export const postBrands = async (name: string) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post(
      "/api/admin/brand?title=" + name
    );
    return response;
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
    const response = await axios.get("/api/reviews", {
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
    const response = await axios.get("/api/review", {
      params: { product_id, user_id },
    });
    state(response.data);
  } catch (error) {
    return error;
  }
};

export const deleteReview = async (product_id: number, user_id: number) => {
  try {
    const response = await axios.delete("/api/review", {
      params: { product_id, user_id },
    });
    return response;
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
    const response = await axios.post("/api/reviews", {
      text,
      product_id,
      user_id,
      value,
    });
    return response;
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
    const response = await axios.post("/api/assessment", {
      likeIt,
      reviews_id,
      user_id,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const postAuthorization = async (data: {
  email: string;
  password: string;
}) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post(
      "/api/authorization",
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.get("/api/logout");
    return response;
  } catch (error) {
    return error;
  }
};

export const postFavourite = async (product_id: number, user_id: number) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post("/api/favourite", {
      product_id,
      user_id,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const postCategory = (parent_id: number | null, name: string) => {
  axios.defaults.withCredentials = true;
  axios.post("/api/admin/category", {
    name: name,
    parent_id,
  });
};

export const deleteCategory = (id: number) => {
  axios.defaults.withCredentials = true;
  axios.delete("/api/admin/category", {
    params: {
      id,
    },
  });
};

export const postProduct = (formData: any) => {
  axios.defaults.withCredentials = true;
  axios.post("/api/admin/product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProduct = (id: number) => {
  axios.defaults.withCredentials = true;
  axios.delete("/api/admin/product", {
    params: {
      id,
    },
  });
};

export const putProduct = (formData: any) => {
  axios.defaults.withCredentials = true;
  axios.put("/api/admin/product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProductImg = (id: number) => {
  axios.defaults.withCredentials = true;
  axios.delete("/api/admin/product/image", {
    params: {
      id,
    },
  });
};

export const postBanners = (formData: any) => {
  axios.defaults.withCredentials = true;
  axios.post("/api/admin/banners", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getBanners = async (state: React.SetStateAction<any>) => {
  try {
    const response = await axios.get("/api/banners");
    state(response.data);
  } catch (error) {
    return error;
  }
};

export const deleteBanners = async (id: number) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.delete(
      "/api/admin/banners",
      {
        params: {
          id,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const postTopCategories = (formData: any) => {
  axios.defaults.withCredentials = true;
  axios.post("/api/admin/topCategories", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getTopCategories = async (state: React.SetStateAction<any>) => {
  try {
    const response = await axios.get("/api/topCategories");
    state(response.data);
  } catch (error) {
    return error;
  }
};

export const deleteTopCategories = async (id: number) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.delete(
      "/api/admin/topCategories",
      {
        params: {
          id,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const postBannersBetween = (formData: any) => {
  axios.defaults.withCredentials = true;
  axios.post("/api/admin/bannersBetween", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getBannersBetween = async (state: React.SetStateAction<any>) => {
  try {
    const response = await axios.get(
      "/api/bannersBetween"
    );
    state(response.data);
  } catch (error) {
    return error;
  }
};

export const deleteBannersBetween = async (id: number) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.delete(
      "/api/admin/bannersBetween",
      {
        params: {
          id,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const putCategory = (formData: any) => {
  axios.defaults.withCredentials = true;
  axios.put("/api/admin/category", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const postOrder = async (data: {
  street: string;
  house: string;
  user_id?: number;
  flat: string;
  phoneNumber: string;
  product_id: { id: number; count: number }[];
  totalPrice: number;
}) => {
  try {
    const response = await axios.post("/api/order", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const postAdmin = async (data: { email: string; password: string }) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post("/api/admin", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAdmin = async (state: React.SetStateAction<any>) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.get("/api/admin");
    state(response);
    return response;
  } catch (error) {
    return error;
  }
};

export const postAdminRegistration = async (data: {
  email: string;
  password: string;
  username: string;
  isAdmin: boolean;
}) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post(
      "/api/admin/registration",
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const adminLogout = async () => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.get("/api/admin/logout");
    return response;
  } catch (error) {
    return error;
  }
};
