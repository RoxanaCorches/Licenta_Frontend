import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from './pages/StartPage';
import PropertiesPage from "./pages/PropertiesPage"
import { ConnectWallet } from "./components/ConnectWallet";
import KYCFormPage from "./pages/KYCFormPage";
import ListYourPropertyPage from "./pages/ListYourPropertyPage";
import MyAccountPage from "./pages/MyAccountPage";
import MyRentalsPage from "./pages/MyRentalsPage";
import MyWalletPage from "./pages/MyWalletPage";

function App() {
  return (
    <ConnectWallet>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/kyc" element={<KYCFormPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/listYourProperty" element={<ListYourPropertyPage />} />
        <Route path="/myAccount" element={<MyAccountPage />} />
        <Route path="/myRentals" element={<MyRentalsPage />} />
        <Route path="/myWallet" element={<MyWalletPage />} />


      </Routes>
    </BrowserRouter>
    </ConnectWallet>

  );
}

export default App;
