import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import ScrollToTop from "@/layout/ScrollToTop";
import AppRoutes from "@/app/routes";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}
