import { useLocation } from "react-router-dom";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import ScrollToTop from "@/layout/ScrollToTop";
import AppRoutes from "@/app/routes";

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      {pathname !== "/checkout" && <Footer />}
    </>
  );
}
