import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Packages from './pages/Packages';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import SmoothScroll from './components/SmoothScroll';

export default function App() {
  return (
    <Router>
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="packages" element={<Packages />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </Router>
  );
}
