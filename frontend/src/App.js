import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Writings from './pages/Writings';
import WritingDetail from './pages/WritingDetail';
import Miscellaneous from './pages/Miscellaneous';
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

  if (window.location.hostname.endsWith('.github.io')) {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    return pathParts.length > 0 ? `/${pathParts[0]}` : '/';
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
          <Route path="/writing/:id" element={<WritingDetail />} />
          <Route path="/miscellaneous" element={<Miscellaneous />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
