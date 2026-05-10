import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Writings from './pages/Writings';
import WritingDetail from './pages/WritingDetail';
import Miscellaneous from './pages/Miscellaneous';
import MiscellaneousDetail from './pages/MiscellaneousDetail';
import './styles/portfolio.css';

const getBasename = () => {
  const publicUrl = process.env.PUBLIC_URL;

  if (publicUrl && publicUrl !== '.') {
    try {
      const parsed = new URL(publicUrl, window.location.origin);
      return parsed.pathname.replace(/\/$/, '') || '/';
    } catch (error) {
      return publicUrl.startsWith('/') ? publicUrl : `/${publicUrl}`;
    }
  }

  return '/';
};

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={getBasename()}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writings" element={<Writings />} />
          <Route path="/writings.html" element={<Writings />} />
          <Route path="/writings/:slug.html" element={<WritingDetail />} />
          <Route path="/writing/:id" element={<WritingDetail />} />
          <Route path="/miscellaneous" element={<Miscellaneous />} />
          <Route path="/miscellaneous.html" element={<Miscellaneous />} />
          <Route path="/miscellanous" element={<Navigate to="/miscellaneous.html" replace />} />
          <Route path="/miscellanoeus" element={<Navigate to="/miscellaneous.html" replace />} />
          <Route path="/miscellanous.html" element={<Navigate to="/miscellaneous.html" replace />} />
          <Route path="/miscellanoeus.html" element={<Navigate to="/miscellaneous.html" replace />} />
          <Route path="/miscellaneous/:slug.html" element={<MiscellaneousDetail />} />
          <Route path="/miscellaneous/topic/:id" element={<MiscellaneousDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
