import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { portfolioData } from '../mock';
import { loadMiscellaneous, loadMiscellaneousTopicContent } from '../lib/miscellaneous';

const MiscellaneousDetail = () => {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const lookupKey = slug || id;
  const cleanLookupKey = lookupKey?.replace(/\.[a-f0-9]{8,}$/i, '');
  const [topic, setTopic] = useState(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const fetchTopic = async () => {
      try {
        const data = await loadMiscellaneous();
        if (!mounted) return;

        const nextTopic = data.topicBySlug[lookupKey]
          || data.topicById[lookupKey]
          || data.topicBySlug[cleanLookupKey]
          || data.topicById[cleanLookupKey];

        if (!nextTopic) {
          setTopic(null);
          return;
        }

        if (slug && lookupKey !== nextTopic.slug) {
          navigate(`/miscellaneous/${nextTopic.slug}.html`, { replace: true });
        }

        const nextContent = await loadMiscellaneousTopicContent(nextTopic.url);
        if (!mounted) return;

        setTopic(nextTopic);
        setContent(nextContent);
        setError('');
      } catch (loadError) {
        if (mounted) {
          setError('Unable to load this topic right now.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTopic();
    return () => {
      mounted = false;
    };
  }, [lookupKey, cleanLookupKey, navigate, slug]);

  if (isLoading) {
    return (
      <div className="portfolio-container">
        <header className="site-header">
          <div className="header-content">
            <Link to="/miscellaneous" className="back-link">
              <ArrowLeft size={20} />
              <span>Back to Miscellaneous</span>
            </Link>
          </div>
        </header>
        <section className="content-section">
          <div className="section-content">
            <p>Loading topic...</p>
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
            <Link to="/miscellaneous" className="back-link">
              <ArrowLeft size={20} />
              <span>Back to Miscellaneous</span>
            </Link>
          </div>
        </header>
        <section className="content-section">
          <div className="section-content">
            <h2>Could not load topic</h2>
            <p>{error}</p>
          </div>
        </section>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="portfolio-container">
        <header className="site-header">
          <div className="header-content">
            <Link to="/miscellaneous" className="back-link">
              <ArrowLeft size={20} />
              <span>Back to Miscellaneous</span>
            </Link>
          </div>
        </header>
        <section className="content-section">
          <div className="section-content">
            <h2>Topic not found</h2>
            <p>The topic you're looking for doesn't exist.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <header className="site-header">
        <div className="header-content">
          <Link to="/miscellaneous" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Miscellaneous</span>
          </Link>
        </div>
      </header>

      <article className="article-container">
        <header className="article-header">
          <h1 className="article-title">{topic.title}</h1>
          <p className="article-date">HTML topic</p>
        </header>
        <div
          className="article-content misc-html-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MiscellaneousDetail;
