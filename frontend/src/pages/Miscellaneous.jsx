import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { portfolioData } from '../mock';
import { loadMiscellaneous } from '../lib/miscellaneous';

const Miscellaneous = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const fetchTopics = async () => {
      try {
        const data = await loadMiscellaneous();
        if (mounted) {
          setTopics(data.topics);
          setError('');
        }
      } catch (loadError) {
        if (mounted) {
          setError('Unable to load topics right now.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTopics();
    return () => {
      mounted = false;
    };
  }, []);

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
          <p className="hero-subtitle">A place for everything that does not neatly fit anywhere else.</p>
        </div>
      </section>

      {isLoading && (
        <section className="content-section">
          <div className="section-content">
            <p>Loading topics...</p>
          </div>
        </section>
      )}

      {error && (
        <section className="content-section">
          <div className="section-content">
            <p>{error}</p>
          </div>
        </section>
      )}

      {!isLoading && !error && topics.length === 0 && (
        <section className="content-section">
          <div className="section-content">
            <p className="placeholder-text">
              Add HTML files to <code>frontend/public/miscellaneous</code> to create topics here.
            </p>
          </div>
        </section>
      )}

      {!isLoading && topics.length > 0 && (
        <section className="content-section">
          <h2 className="section-title">Topics</h2>
          <div className="section-content">
            <div className="writings-grid">
              {topics.map((topic) => (
                <Link
                  key={topic.id}
                  to={`/miscellaneous/${topic.slug}.html`}
                  className="writing-card"
                >
                  <h3 className="writing-title">{topic.title}</h3>
                  <p className="writing-excerpt">{topic.excerpt}</p>
                  <div className="writing-meta">
                    <span className="writing-time">HTML topic</span>
                  </div>
                </Link>
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

export default Miscellaneous;
