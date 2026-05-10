import React, { useEffect, useMemo, useState } from 'react';
import { PartyPopper } from 'lucide-react';
import {
  getArticleClapCount,
  getArticleClapVisitorId,
  incrementArticleClaps,
  isArticleClapsConfigured
} from '../lib/articleClaps';

const ArticleClaps = ({ slug }) => {
  const storageKey = useMemo(() => `article-clapped:${slug}`, [slug]);
  const [count, setCount] = useState(0);
  const [hasClapped, setHasClapped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [visitorId, setVisitorId] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadCount = async () => {
      if (!isArticleClapsConfigured || !slug) {
        setIsLoading(false);
        return;
      }

      try {
        const currentVisitorId = getArticleClapVisitorId();
        const savedClap = window.localStorage.getItem(storageKey) === 'true';
        const clapCount = await getArticleClapCount(slug);

        if (mounted) {
          setVisitorId(currentVisitorId);
          setHasClapped(savedClap);
          setCount(clapCount);
          setHasError(false);
        }
      } catch (error) {
        if (mounted) {
          setHasError(true);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadCount();

    return () => {
      mounted = false;
    };
  }, [slug, storageKey]);

  const handleClap = async () => {
    if (hasClapped || isSaving || !slug || !visitorId) return;

    setIsSaving(true);
    setHasError(false);

    try {
      const result = await incrementArticleClaps(slug, visitorId);
      window.localStorage.setItem(storageKey, 'true');
      setHasClapped(true);
      setCount(result.count);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isArticleClapsConfigured) return null;

  return (
    <aside className="article-claps" aria-label="Article reactions">
      <button
        className={`article-clap-button${hasClapped ? ' is-active' : ''}`}
        type="button"
        onClick={handleClap}
        disabled={isLoading || isSaving || hasClapped}
        aria-pressed={hasClapped}
        title={hasClapped ? 'Already clapped' : 'Clap for this article'}
      >
        <PartyPopper size={18} />
        <span>{hasClapped ? 'Clapped' : 'Clap'}</span>
        <strong>{isLoading ? '...' : count}</strong>
      </button>
      {hasError && (
        <span className="article-clap-status" role="status">
          Could not update
        </span>
      )}
    </aside>
  );
};

export default ArticleClaps;
