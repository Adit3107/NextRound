import { Link } from "react-router-dom";

export const LogoContainer = () => {
  return (
    <Link to={"/"}>
      <img
        src="/assets/svg/download4.svg"
        alt=""
        className="size-10 object-contain"
      />
    </Link>
  );
};