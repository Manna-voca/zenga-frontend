import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const CommonHeaderLayout = () => {
  return (
    <>
      <Header type="common" />
      <Outlet />
    </>
  );
};

export default CommonHeaderLayout;
