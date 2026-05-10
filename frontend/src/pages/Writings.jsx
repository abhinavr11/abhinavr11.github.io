import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { portfolioData } from '../mock';
import { loadWritings } from '../lib/writings';

const WritingCard = ({ writing, variant = '' }) => {
  const className = ['writing-card', variant].filter(Boolean).join(' ');
  const content = (
    <>
      <h3 className="writing-title">{writing.title}</h3>
      <p className="writing-excerpt">{writing.excerpt}</p>
      <div className="writing-meta">
        <span className="writing-date">{writing.date}</span>
        <span className="writing-time">
          <Clock size={14} />
          {writing.readTime}
        </span>
      </div>
    </>
  );

  if (writing.externalUrl) {
    return (
      <a
        href={writing.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={`/writings/${writing.slug}.html`} className={className}>
      {content}
    </Link>
  );
};

const CategoryPanel = ({
  id,
  title,
  writings,
  isOpen,
  onToggle
}) => {
  if (!writings.length) return null;

  const featuredWriting = writings[0];
  const remainingWritings = writings.slice(1);
  const dropdownLabel = remainingWritings.length
    ? `${remainingWritings.length} more`
    : 'No older articles yet';

  return (
    <section className="writing-category-panel">
      <button
        className="section-toggle writing-category-toggle"
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-writings-content`}
      >
        <span>
          <span className="section-title writing-category-title">{title}</span>
          <span className="writing-category-count">{dropdownLabel}</span>
        </span>
        {isOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
      </button>

      <div className="writing-category-preview">
        <WritingCard writing={featuredWriting} variant="writing-card-compact" />
      </div>

      {isOpen && (
        <div className="section-dropdown-content writing-category-dropdown" id={`${id}-writings-content`}>
          {remainingWritings.length > 0 ? (
            <div className="writings-grid writings-grid-compact">
              {remainingWritings.map((writing) => (
                <WritingCard key={writing.id} writing={writing} variant="writing-card-compact" />
              ))}
            </div>
          ) : (
            <p className="writing-empty-note">The newest article is already shown above.</p>
          )}
        </div>
      )}
    </section>
  );
};

const Writings = () => {
  const [writings, setWritings] = useState({
    technicalWritings: [],
    nonTechnicalWritings: [],
    allWritings: []
  });
  const [openSections, setOpenSections] = useState({
    nonTechnical: false,
    technical: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const fetchWritings = async () => {
      try {
        const data = await loadWritings();
        if (mounted) {
          setWritings({
            technicalWritings: data.technicalWritings,
            nonTechnicalWritings: data.nonTechnicalWritings,
            allWritings: data.allWritings
          });
          setError('');
        }
      } catch (fetchError) {
        if (mounted) {
          setError('Unable to load writings right now.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchWritings();
    return () => {
      mounted = false;
    };
  }, []);

  const { technicalWritings, nonTechnicalWritings, allWritings } = writings;
  const latestWritings = allWritings.slice(0, 3);

  const toggleSection = (section) => {
    setOpenSections((currentSections) => ({
      ...currentSections,
      [section]: !currentSections[section]
    }));
  };

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

      {isLoading && (
        <section className="content-section">
          <div className="section-content">
            <p>Loading writings...</p>
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

      {!isLoading && latestWritings.length > 0 && (
        <section className="content-section writings-latest-section">
          <div className="writings-section-heading">
            <h2 className="section-title">Latest Articles</h2>
          </div>
          <div className="writings-latest-grid">
            {latestWritings.map((writing, index) => (
              <WritingCard
                key={writing.id}
                writing={writing}
                variant={index === 0 ? 'writing-card-featured' : 'writing-card-compact'}
              />
            ))}
          </div>
        </section>
      )}

      {!isLoading && (nonTechnicalWritings.length > 0 || technicalWritings.length > 0) && (
        <section className="content-section writings-categories-section">
          <div className="writing-category-panels">
            <CategoryPanel
              id="non-technical"
              title="Non-Technical"
              writings={nonTechnicalWritings}
              isOpen={openSections.nonTechnical}
              onToggle={() => toggleSection('nonTechnical')}
            />
            <CategoryPanel
              id="technical"
              title="Technical"
              writings={technicalWritings}
              isOpen={openSections.technical}
              onToggle={() => toggleSection('technical')}
            />
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
