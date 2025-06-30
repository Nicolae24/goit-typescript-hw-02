import s from "./Heading.module.css";
import { JSX } from "react";

const Heading = (): JSX.Element => {
  return (
    <div className={s.title}>Sorry, there are no results on your request</div>
  );
};

export default Heading;
