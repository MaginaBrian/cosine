import { useLocation } from "react-router-dom";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import ScrollToTop from "@/layout/ScrollToTop";
import AppRoutes from "@/app/routes";

export default function App() {
  const { pathname } = useLocation();
  const studio = pathname === "/checkout" || pathname === "/admin";

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      {!studio && <Footer />}
    </>
  );
}
