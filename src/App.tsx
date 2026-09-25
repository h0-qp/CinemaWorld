import { useState } from 'react';
import { MOVIES_DATA, TRIVIA_QUESTIONS } from './data/mockData';
import { Movie } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ReleaseRadar from './components/ReleaseRadar';
import CuratedRecommendations from './components/CuratedRecommendations';
import TriviaQuiz from './components/TriviaQuiz';
import MovieModal from './components/MovieModal';
import Footer from './components/Footer';

export default function App() {
  const [activeTrailerMovie, setActiveTrailerMovie] = useState<Movie | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Featured movie for Hero: Dune: Part Two
  const featuredMovie = MOVIES_DATA.find(m => m.id === 'dune-2') || MOVIES_DATA[0];

  // Upcoming movies for Release Radar
  const upcomingMovies = MOVIES_DATA.filter(m => m.isUpcoming);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#E8E8E6] selection:bg-[#C5A059]/20 selection:text-[#E2C378]">
      
      {/* Sticky Classical Masthead */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
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
          movies={MOVIES_DATA}
          onWatchTrailer={(movie) => setActiveTrailerMovie(movie)}
        />

        <TriviaQuiz
          questions={TRIVIA_QUESTIONS}
        />
      </main>

      {/* Colophon & Footer */}
      <Footer />

      {/* Trailer Presentation Modal */}
      <MovieModal
        movie={activeTrailerMovie}
        onClose={() => setActiveTrailerMovie(null)}
      />

    </div>
  );
}
