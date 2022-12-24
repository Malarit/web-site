import Cookies from "universal-cookie";
const cookies = new Cookies();

export const setCookiesToken = (
  access_token: string,
  refresh_token: string
) => {
  cookies.set("access_token", access_token, {
    path: "/",
  });
  cookies.set("refresh_token", refresh_token, {
    path: "/",
  });
};

export const getCookiesToken = (): {
  access_token: string;
  refresh_token: string;
} => {
  return {
    access_token: cookies.get("access_token"),
    refresh_token: cookies.get("refresh_token"),
  };
};
