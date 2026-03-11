import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-[80px]">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default UserLayout;