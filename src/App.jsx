import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from './pages/StartPage';
import PropertiesPage from "./pages/PropertiesPage"
import { ConnectWallet } from "./components/ConnectWallet";
import KYCFormPage from "./pages/KYCFormPage";
import ListYourPropertyPage from "./pages/ListYourPropertyPage";
import MyAccountPage from "./pages/MyAccountPage";
import MyRentalsPage from "./pages/MyRentalsPage";
import MyWalletPage from "./pages/MyWalletPage";
import PropertyInfo from "./components/property/PropertyInfo";
import ReservePage from "./pages/ReservePage";
import MyListingsPage from "./pages/MyListingsPage";
import MyReviewPage from "./pages/MyReviewPage";

function App() {
  return (
    <ConnectWallet>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/kyc" element={<KYCFormPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/property/:id" element={<PropertyInfo />} />
        <Route path="/properties/property/:id/reserve" element={<ReservePage />} />
        
        <Route path="/listYourProperty" element={<ListYourPropertyPage />} />
        <Route path="/myAccount" element={<MyAccountPage />} />
        <Route path="/myRentals" element={<MyRentalsPage />} />
        <Route path="/myListings" element={<MyListingsPage />} />
        <Route path="/myWallet" element={<MyWalletPage />} />
         <Route path="/myReviews" element={<MyReviewPage />} />

      </Routes>
    </BrowserRouter>
    </ConnectWallet>

  );
}

export default App;
