import { Route, Routes } from "react-router-dom";
import HomePage from "@/features/home/HomePage";
import CollectionsPage from "@/features/catalog/CollectionsPage";
import FeaturedPage from "@/features/catalog/FeaturedPage";
import MenPage from "@/features/catalog/MenPage";
import WomenPage from "@/features/catalog/WomenPage";
import ProductPage from "@/features/product/ProductPage";
import BagPage from "@/features/bag/BagPage";
import AboutPage from "@/features/studio/AboutPage";
import ContactPage from "@/features/studio/ContactPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/featured" element={<FeaturedPage />} />
      <Route path="/men" element={<MenPage />} />
      <Route path="/women" element={<WomenPage />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/bag" element={<BagPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
