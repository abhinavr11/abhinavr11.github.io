import React, { useEffect, useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import { getArticleClapCount, incrementArticleClaps, isArticleClapsConfigured } from '../lib/articleClaps';

const ArticleClaps = ({ slug }) => {
  const storageKey = useMemo(() => `article-clapped:${slug}`, [slug]);
  const [count, setCount] = useState(0);
  const [hasClapped, setHasClapped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadCount = async () => {
      if (!isArticleClapsConfigured || !slug) {
        setIsLoading(false);
        return;
      }

      try {
        const savedClap = window.localStorage.getItem(storageKey) === 'true';
        const clapCount = await getArticleClapCount(slug);

        if (mounted) {
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
    if (hasClapped || isSaving || !slug) return;

    setIsSaving(true);
    setHasError(false);

    try {
      const nextCount = await incrementArticleClaps(slug);
      window.localStorage.setItem(storageKey, 'true');
      setHasClapped(true);
      setCount(nextCount);
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
      >
        <Heart size={18} fill={hasClapped ? 'currentColor' : 'none'} />
        <span>{hasClapped ? 'Liked' : 'Like'}</span>
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
