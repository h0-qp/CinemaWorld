import { useState, useEffect } from 'react';
import { MOVIES_DATA, NEWS_DATA } from './data/mockData';
import { Movie, NewsItem, GenreFilter } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ReleaseRadar from './components/ReleaseRadar';
import CuratedRecommendations from './components/CuratedRecommendations';
import NewsSection from './components/NewsSection';
import DirectorsSection from './components/DirectorsSection';
import MovieModal from './components/MovieModal';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { subscribeToMovies, subscribeToNews } from './firebase/contentService';

export default function App() {
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.pathname.toLowerCase().startsWith('/admin') ||
           window.location.search.includes('admin=true');
  });

  const [movies, setMovies] = useState<Movie[]>(MOVIES_DATA);
  const [news, setNews] = useState<NewsItem[]>(NEWS_DATA);

  const [activeTrailerMovie, setActiveTrailerMovie] = useState<Movie | null>(null);
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

  // Real-time synchronization with Firebase Firestore
  useEffect(() => {
    const unsubMovies = subscribeToMovies((liveMovies) => {
      setMovies(liveMovies);
    });

    const unsubNews = subscribeToNews((liveNews) => {
      setNews(liveNews);
    });

    return () => {
      unsubMovies();
      unsubNews();
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

  // Featured movie for Hero
  const featuredMovie = movies.find(m => m.id === 'dune-2') || movies[0];

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
      <div className="min-h-screen bg-[#0B0B0B] text-[#E8E8E6] selection:bg-[#C5A059]/20 selection:text-[#E2C378]">
        
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
            onWatchTrailer={(movie) => setActiveTrailerMovie(movie)}
          />

          <ReleaseRadar
            upcomingMovies={upcomingMovies}
            onWatchTrailer={(movie) => setActiveTrailerMovie(movie)}
          />

          <CuratedRecommendations
            movies={movies}
            onWatchTrailer={(movie) => setActiveTrailerMovie(movie)}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Real-time Editorial News Section */}
          <NewsSection news={news} />

          <DirectorsSection />
        </main>

        {/* Colophon & Footer */}
        <Footer />

        {/* Trailer Presentation Modal */}
        <MovieModal
          movie={activeTrailerMovie}
          onClose={() => setActiveTrailerMovie(null)}
        />

      </div>
    </AuthProvider>
  );
}
