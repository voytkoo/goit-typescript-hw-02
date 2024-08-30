import React from "react";
import { Rings } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={s.loader}>
      <Rings color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
