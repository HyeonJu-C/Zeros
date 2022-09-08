import React, { useContext } from "react";
import AuthContext from "../../context/Auth";

function My() {
  const { uid } = useContext(AuthContext);
  return <section className="page-layout">{uid}</section>;
}

export default My;
