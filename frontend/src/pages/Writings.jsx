import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { portfolioData } from '../mock';

const Writings = () => {
  return (
    <div className="portfolio-container">
      {/* Header */}
      <header className="site-header">
        <div className="header-content">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="site-title">Writings</h1>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section writings-hero">
        <div className="hero-content">
          <h1 className="hero-title">Writings</h1>
          <p className="hero-subtitle">I write what comes to my mind. I sincerely apologise if for any factual error I make in any of my writings. Please accept my apologies for any unkownigly caused inconvience for whatever reason.</p>
        </div>
      </section>

      {/* Technical Writings */}
      {portfolioData.technicalWritings.length > 0 && (
        <section className="content-section">
          <h2 className="section-title">Technical</h2>
          <div className="section-content">
            <div className="writings-grid">
              {portfolioData.technicalWritings.map((writing) => (
                writing.isPdf ? (
                  <a
                    key={writing.id}
                    href={writing.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="writing-card"
                  >
                    <h3 className="writing-title">{writing.title}</h3>
                    <p className="writing-excerpt">{writing.excerpt}</p>
                    <div className="writing-meta">
                      <span className="writing-date">{writing.date}</span>
                      <span className="writing-time">
                        <Clock size={14} />
                        {writing.readTime}
                      </span>
                    </div>
                  </a>
                ) : (
                  <Link
                    key={writing.id}
                    to={`/writing/${writing.id}`}
                    className="writing-card"
                  >
                    <h3 className="writing-title">{writing.title}</h3>
                    <p className="writing-excerpt">{writing.excerpt}</p>
                    <div className="writing-meta">
                      <span className="writing-date">{writing.date}</span>
                      <span className="writing-time">
                        <Clock size={14} />
                        {writing.readTime}
                      </span>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Non-Technical Writings */}
      {portfolioData.nonTechnicalWritings.length > 0 && (
        <section className="content-section">
          <h2 className="section-title">Non Technical Articles</h2>
          <div className="section-content">
            <div className="writings-grid">
              {portfolioData.nonTechnicalWritings.map((writing) => (
                writing.isPdf ? (
                  <a
                    key={writing.id}
                    href={writing.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="writing-card"
                  >
                    <h3 className="writing-title">{writing.title}</h3>
                    <p className="writing-excerpt">{writing.excerpt}</p>
                    <div className="writing-meta">
                      <span className="writing-date">{writing.date}</span>
                      <span className="writing-time">
                        <Clock size={14} />
                        {writing.readTime}
                      </span>
                    </div>
                  </a>
                ) : (
                  <Link
                    key={writing.id}
                    to={`/writing/${writing.id}`}
                    className="writing-card"
                  >
                    <h3 className="writing-title">{writing.title}</h3>
                    <p className="writing-excerpt">{writing.excerpt}</p>
                    <div className="writing-meta">
                      <span className="writing-date">{writing.date}</span>
                      <span className="writing-time">
                        <Clock size={14} />
                        {writing.readTime}
                      </span>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Writings;
