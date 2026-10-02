import { useState, useEffect, useMemo } from 'react';
import { MOVIES_DATA, NEWS_DATA } from './data/mockData';
import { Movie, NewsItem, GenreFilter, AdSettings } from './types';
import { DEFAULT_AD_SETTINGS } from './data/defaultAds';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ReleaseRadar from './components/ReleaseRadar';
import CuratedRecommendations from './components/CuratedRecommendations';
import NewsSection from './components/NewsSection';
import DirectorsSection from './components/DirectorsSection';
import MovieModal from './components/MovieModal';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AdBanner from './components/AdBanner';
import ShareToast from './components/ShareToast';
import { AuthProvider } from './context/AuthContext';
import { subscribeToMovies, subscribeToNews, subscribeToAdSettings } from './firebase/contentService';

export default function App() {
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.pathname.toLowerCase().startsWith('/admin') ||
           window.location.search.includes('admin=true');
  });

  const [movies, setMovies] = useState<Movie[]>(MOVIES_DATA);
  const [news, setNews] = useState<NewsItem[]>(NEWS_DATA);
  const [adSettings, setAdSettings] = useState<AdSettings>(DEFAULT_AD_SETTINGS);

  const [activeTrailerMovie, setActiveTrailerMovie] = useState<Movie | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedGenre, setSelectedGenre] = useState<GenreFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL Path changes for /admin
  useEffect(() => {
    const handlePopState = () => {
      const isPathAdmin = window.location.pathname.toLowerCase().startsWith('/admin') ||
                          window.location.search.includes('admin=true');
      setIsAdminView(isPathAdmin);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Deep-linking handler for ?movie=<id> & ?news=<id>
  useEffect(() => {
    const handleUrlDeepLinks = () => {
      const params = new URLSearchParams(window.location.search);
      const movieId = params.get('movie') || params.get('film');
      const newsId = params.get('news') || params.get('article');

      if (movieId && movies.length > 0) {
        const found = movies.find(m => m.id === movieId);
        if (found) {
          setActiveTrailerMovie(found);
        }
      }

      if (newsId && news.length > 0) {
        setActiveArticleId(newsId);
      }
    };

    handleUrlDeepLinks();
    window.addEventListener('popstate', handleUrlDeepLinks);
    return () => window.removeEventListener('popstate', handleUrlDeepLinks);
  }, [movies, news]);

  // Real-time synchronization with Firebase Firestore
  useEffect(() => {
    const unsubMovies = subscribeToMovies((liveMovies) => {
      setMovies(liveMovies);
    });

    const unsubNews = subscribeToNews((liveNews) => {
      setNews(liveNews);
    });

    const unsubAds = subscribeToAdSettings((liveAds) => {
      setAdSettings(liveAds);
    });

    return () => {
      unsubMovies();
      unsubNews();
      unsubAds();
    };
  }, []);

  const openAdminView = () => {
    setIsAdminView(true);
    window.history.pushState(null, '', '/admin');
  };

  const closeAdminView = () => {
    setIsAdminView(false);
    window.history.pushState(null, '', '/');
  };

  const handleOpenMovieTrailer = (movie: Movie) => {
    setActiveTrailerMovie(movie);
    const url = new URL(window.location.href);
    url.searchParams.set('movie', movie.id);
    window.history.pushState(null, '', url.toString());
  };

  const handleCloseMovieTrailer = () => {
    setActiveTrailerMovie(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('movie');
    url.searchParams.delete('film');
    window.history.pushState(null, '', url.toString());
  };

  // Featured movie for Hero: prioritizes any movie set as isFeatured, or the newest added movie
  const featuredMovie = useMemo(() => {
    if (!movies || movies.length === 0) return MOVIES_DATA[0];
    const explicitlyFeatured = movies.find(m => m.isFeatured);
    if (explicitlyFeatured) return explicitlyFeatured;
    const nonUpcoming = movies.filter(m => !m.isUpcoming);
    return nonUpcoming.length > 0 ? nonUpcoming[0] : movies[0];
  }, [movies]);

  // Upcoming movies for Release Radar
  const upcomingMovies = movies.filter(m => m.isUpcoming);

  const handleSelectWatchlist = () => {
    setSelectedGenre('Watchlist');
    setActiveSection('recommendations');
    const el = document.getElementById('recommendations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If on /admin, show the dedicated Admin Dashboard
  if (isAdminView) {
    return (
      <AuthProvider>
        <AdminDashboard
          movies={movies}
          news={news}
          onExit={closeAdminView}
        />
      </AuthProvider>
    );
  }

  // Public Classical Cinema World Portal
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0B0E14] text-[#E2E8F0] selection:bg-[#E50914]/30 selection:text-white">
        
        {/* Sticky Classical Masthead */}
        <Navbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onSelectWatchlist={handleSelectWatchlist}
        />

        {/* Main Editorial Sections */}
        <main>
          <Hero
            featuredMovie={featuredMovie}
            onWatchTrailer={handleOpenMovieTrailer}
          />

          {/* Real-time Editorial News Section FIRST */}
          <NewsSection 
            news={news} 
            activeArticleId={activeArticleId}
            onClearActiveArticle={() => setActiveArticleId(null)}
          />

          {/* High-Impact Leaderboard / Header Sponsor */}
          <AdBanner placement="header" settings={adSettings} />

          {/* Curated Movie Recommendations SECOND */}
          <CuratedRecommendations
            movies={movies}
            onWatchTrailer={handleOpenMovieTrailer}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* In-Feed Native Cinema Sponsor */}
          <AdBanner placement="feed" settings={adSettings} />

          {/* Release Radar & Theatrical Calendar */}
          <ReleaseRadar
            upcomingMovies={upcomingMovies}
            onWatchTrailer={handleOpenMovieTrailer}
          />

          {/* Mid-Page Wide Theatrical Ad Banner */}
          <AdBanner placement="mid" settings={adSettings} />

          <DirectorsSection />

          {/* Pre-Footer Sponsor Banner */}
          <AdBanner placement="footer" settings={adSettings} />
        </main>

        {/* Colophon & Footer */}
        <Footer />

        {/* Trailer Presentation Modal */}
        <MovieModal
          movie={activeTrailerMovie}
          onClose={handleCloseMovieTrailer}
        />

        {/* Global Toast for Link Sharing */}
        <ShareToast />

      </div>
    </AuthProvider>
  );
}
