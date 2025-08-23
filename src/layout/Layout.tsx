import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
export default function Layout() {
  const location = useLocation();
  const isEditPage = location.pathname.includes("/edit");
  return (
    <div
      className={`xl:grid xl:grid-cols-[auto_1fr] ${
        isEditPage ? "xl:h-auto xl:min-h-screen" : "xl:min-h-screen"
      }`}
    >
      <Header />
      <main
        className="
        bg-[#f8f8f8]
        w-full xl:overflow-auto"
      >
        <Outlet />
      </main>
    </div>
  );
}
