import react from 'react'
import {
  HashRouter as Router,
  Route, Routes
} from 'react-router-dom';

import ZipConverter from './components/ZipConverter';
import PhotoSizing from './components/PhotoSizing';
import PdfConverter from './components/PdfConverter';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Logo from './components/Logo';

function App() {
  return (
    <div className="App text-Roboto h-screen overflow-hidden bg-gradient-to-tr from-neutral-700 via-gray-800 to-neutral-900">

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Logo />} />
          <Route path='/zip_converter' element={<ZipConverter />} />
          <Route path='/photo_sizing' element={<PhotoSizing />} />
          <Route path='/pdf_converter' element={<PdfConverter />} />



          <Route path='/loading' element={<Loading />} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
