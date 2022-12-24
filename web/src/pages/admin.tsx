import React from "react";
import { useDispatch } from "react-redux";

import { fetchCategory } from "../store/slices/category/slice";


import Management from "../components/management";

import appStyle from "../app.module.scss";

const Admin: React.FC = () => {
  const dispatch = useDispatch()
  let flag = React.useRef(true);
  React.useEffect(() => {
    if (flag.current) dispatch<any>(fetchCategory());
    flag.current = false;
  }, []);
  
  return (
    <div className={appStyle.container}>
      <Management />
    </div>
  );
};

export default Admin;
