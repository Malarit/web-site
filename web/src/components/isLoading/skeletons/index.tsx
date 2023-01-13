import React from "react";

import ContentLoader from "react-content-loader";

const Skeletons: React.FC = () => (
  <ContentLoader
    speed={2}
    width={220}
    height={385}
    viewBox="0 0 200 385"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="22" y="13" rx="0" ry="0" width="155" height="155" />
    <rect x="22" y="174" rx="0" ry="0" width="100" height="24" />
    <rect x="22" y="208" rx="0" ry="0" width="154" height="56" />
    <rect x="22" y="279" rx="0" ry="0" width="73" height="28" />
    <rect x="22" y="335" rx="0" ry="0" width="100" height="30" />
  </ContentLoader>
);

export default Skeletons;
