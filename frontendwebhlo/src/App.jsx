import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import GalleryPage from './pages/GalleryPage';
import PartnersPage from './pages/PartnersPage';
import PlatformsPage from './pages/PlatformsPage';
import RedeemPage from './pages/RedeemPage';
import MerchanPage from './pages/MerchanPage';


function App() {
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/aboutus' element={<AboutUsPage />} />
        <Route path='/gallery' element={<GalleryPage />} />
        <Route path='/partners' element={<PartnersPage />} />
        <Route path='/platforms' element={<PlatformsPage />} />
        <Route path='/redeem' element={<RedeemPage />} />
        <Route path='/merchan' element={<MerchanPage />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
