import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
export default function Layout() {
  const location = useLocation();
  const isEditPage = location.pathname.includes("/edit");
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  return (
    <div
      className={`xl:grid xl:grid-cols-[auto_1fr] ${
        isEditPage ? "xl:h-auto xl:min-h-screen" : "xl:min-h-screen"
      }`}
    >
      <Header isDark={isDark} setIsDark={setIsDark} />
      <main
        className="
        w-full xl:overflow-auto"
      >
        <Outlet />
      </main>
    </div>
  );
}
