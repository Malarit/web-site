import React from "react";

import Management from "../components/management";

import appStyle from "../app.module.scss";

const Admin: React.FC = () => {
  return (
    <div className={appStyle.container}>
      <Management />
    </div>
  );
};

export default Admin;
