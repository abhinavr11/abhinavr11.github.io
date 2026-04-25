import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { portfolioData } from '../mock';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { loadWritings } from '../lib/writings';

const WritingDetail = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const fetchContent = async () => {
      try {
        const data = await loadWritings();
        if (!mounted) return;

        const writing = data.writingById[id];
        if (!writing) {
          setContent(null);
          return;
        }

        if (writing.externalUrl) {
          window.location.assign(writing.externalUrl);
          return;
        }

        setContent(writing);
        setError('');
      } catch (loadError) {
        if (mounted) {
          setError('Unable to load this writing right now.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchContent();
    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (content) {
      renderMath();
    }
  }, [content]);

  const renderMath = () => {
    // Render display math ($$...$$)
    const displayMathElements = document.querySelectorAll('.math-display');
    displayMathElements.forEach(elem => {
      const math = elem.textContent;
      try {
        katex.render(math, elem, {
          displayMode: true,
          throwOnError: false
        });
      } catch (e) {
        console.error('KaTeX rendering error:', e);
      }
    });

    // Render inline math ($...$)
    const inlineMathElements = document.querySelectorAll('.math-inline');
    inlineMathElements.forEach(elem => {
      const math = elem.textContent;
      try {
        katex.render(math, elem, {
          displayMode: false,
          throwOnError: false
        });
      } catch (e) {
        console.error('KaTeX rendering error:', e);
      }
    });
  };

  const processContent = (text) => {
    if (!text) return [];
    
    // Split by display math blocks ($$...$$)
    const parts = text.split(/(\$\$[\s\S]*?\$\$)/);
    const result = [];
    
    parts.forEach((part, idx) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2).trim();
        result.push(<div key={`math-${idx}`} className="math-display">{math}</div>);
      } else {
        // Process inline math ($...$)
        const inlineParts = part.split(/(\$[^$]+\$)/);
        const inlineResult = inlineParts.map((inlinePart, inlineIdx) => {
          if (inlinePart.startsWith('$') && inlinePart.endsWith('$') && !inlinePart.startsWith('$$')) {
            const math = inlinePart.slice(1, -1);
            return <span key={`${idx}-${inlineIdx}`} className="math-inline">{math}</span>;
          }
          return <span key={`${idx}-${inlineIdx}`}>{inlinePart}</span>;
        });
        result.push(...inlineResult);
      }
    });
    
    return result;
  };

  const renderMarkdown = (markdown) => {
    if (!markdown) return null;
    
    const lines = markdown.split('\n');
    const elements = [];
    let currentParagraph = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={elements.length} className="article-paragraph">
            {processContent(currentParagraph.join(' '))}
          </p>
        );
        currentParagraph = [];
      }
    };

    lines.forEach((line, idx) => {
      if (line.startsWith('# ')) {
        flushParagraph();
        elements.push(
          <h1 key={elements.length} className="article-h1">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        flushParagraph();
        elements.push(
          <h2 key={elements.length} className="article-h2">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushParagraph();
        elements.push(
          <h3 key={elements.length} className="article-h3">
            {line.slice(4)}
          </h3>
        );
      } else if (line.trim() === '') {
        flushParagraph();
      } else if (line.startsWith('$$')) {
        flushParagraph();
        // Display math block will be handled in processContent
        currentParagraph.push(line);
        flushParagraph();
      } else {
        currentParagraph.push(line);
      }
    });

    flushParagraph();
    return elements;
  };

  if (isLoading) {
    return (
      <div className="portfolio-container">
        <header className="site-header">
          <div className="header-content">
            <Link to="/writings" className="back-link">
              <ArrowLeft size={20} />
              <span>Back to Writings</span>
            </Link>
          </div>
        </header>
        <section className="content-section">
          <div className="section-content">
            <p>Loading writing...</p>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-container">
        <header className="site-header">
          <div className="header-content">
            <Link to="/writings" className="back-link">
              <ArrowLeft size={20} />
              <span>Back to Writings</span>
            </Link>
          </div>
        </header>
        <section className="content-section">
          <div className="section-content">
            <h2>Could not load writing</h2>
            <p>{error}</p>
          </div>
        </section>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="portfolio-container">
        <header className="site-header">
          <div className="header-content">
            <Link to="/writings" className="back-link">
              <ArrowLeft size={20} />
              <span>Back to Writings</span>
            </Link>
          </div>
        </header>
        <section className="content-section">
          <div className="section-content">
            <h2>Writing not found</h2>
            <p>The writing you're looking for doesn't exist.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      {/* Header */}
      <header className="site-header">
        <div className="header-content">
          <Link to="/writings" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Writings</span>
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="article-container">
        <header className="article-header">
          <h1 className="article-title">{content.title}</h1>
          <p className="article-date">{content.date}</p>
        </header>
        <div className="article-content">
          {renderMarkdown(content.content)}
        </div>
      </article>

      {/* Footer */}
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WritingDetail;
