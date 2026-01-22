import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from './pages/StartPage';
import PropertiesPage from "./pages/PropertiesPage"
import { ConnectWallet } from "./components/ConnectWallet";
import KYCFormPage from "./pages/KYCFormPage";
import ListYourPropertyPage from "./pages/ListYourPropertyPage";

function App() {
  return (
    <ConnectWallet>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/kyc" element={<KYCFormPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/listYourProperty" element={<ListYourPropertyPage />} />

      </Routes>
    </BrowserRouter>
    </ConnectWallet>

  );
}

export default App;
