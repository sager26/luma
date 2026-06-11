import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroll from './components/SmoothScroll';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Packages = lazy(() => import('./pages/Packages'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));

export default function App() {
  return (
    <Router>
      <SmoothScroll>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="packages" element={<Packages />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </Suspense>
      </SmoothScroll>
    </Router>
  );
}
