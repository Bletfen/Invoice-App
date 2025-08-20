import { Outlet } from "react-router-dom";
import Header from "../components/Header";
export default function Layout() {
  return (
    <div className="flex flex-col xl:flex-row">
      <Header />
      <div
        className="px-[2.4rem]
        bg-[#f8f8f8] min-h-screen
        pb-[10.5rem] w-full"
      >
        <Outlet />
      </div>
    </div>
  );
}
