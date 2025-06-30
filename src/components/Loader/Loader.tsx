import { RingLoader } from "react-spinners";
import s from "./Loader.module.css";
import { JSX } from "react";

const Loader = (): JSX.Element => {
  return (
    <div className={s.loader}>
      <RingLoader
        color="#1ed1ff"
        cssOverride={{}}
        size={300}
        speedMultiplier={4}
      />
    </div>
  );
};

export default Loader;
