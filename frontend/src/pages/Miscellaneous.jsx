import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { portfolioData } from '../mock';

const Miscellaneous = () => {
  return (
    <div className="portfolio-container">
      {/* Header */}
      <header className="site-header">
        <div className="header-content">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="site-title">Miscellaneous</h1>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section misc-hero">
        <div className="hero-content">
          <h1 className="hero-title">Miscellaneous</h1>
          <p className="hero-subtitle">Coming soon...</p>
        </div>
      </section>

      {/* Content */}
      <section className="content-section">
        <div className="section-content">
          <p className="placeholder-text">
            This section is currently under construction. Check back soon for more content!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Miscellaneous;