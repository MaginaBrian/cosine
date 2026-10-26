import { Route, Routes } from "react-router-dom";
import HomePage from "@/features/home/HomePage";
import CollectionsPage from "@/features/catalog/CollectionsPage";
import FeaturedPage from "@/features/catalog/FeaturedPage";
import MenPage from "@/features/catalog/MenPage";
import WomenPage from "@/features/catalog/WomenPage";
import ColourPage from "@/features/catalog/ColourPage";
import ProductPage from "@/features/product/ProductPage";
import BagPage from "@/features/bag/BagPage";
import CheckoutPage from "@/features/checkout/CheckoutPage";
import AboutPage from "@/features/studio/AboutPage";
import ContactPage from "@/features/studio/ContactPage";
import PrivacyPage from "@/features/studio/PrivacyPage";
import AdminPage from "@/features/admin/AdminPage";
import AccountPage from "@/features/account/AccountPage";
import RequireAuth from "@/features/account/RequireAuth";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/featured" element={<FeaturedPage />} />
      <Route path="/men" element={<MenPage />} />
      <Route path="/women" element={<WomenPage />} />
      <Route path="/colour/:slug" element={<ColourPage />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/bag" element={<BagPage />} />
      <Route
        path="/checkout"
        element={
          <RequireAuth>
            <CheckoutPage />
          </RequireAuth>
        }
      />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route
        path="/admin"
        element={
          <RequireAuth admin>
            <AdminPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
