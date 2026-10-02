import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { auth, db, loginWithGoogle, logoutUser, handleFirestoreError, OperationType } from '../firebase/config';
import { Movie } from '../types';
import { triggerToast } from '../utils/shareUtils';

const LOCAL_WATCHLIST_KEY = 'cinemaworld_saved_watchlist';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  watchlist: string[];
  toggleWatchlist: (movie: Movie) => Promise<void>;
  isBookmarked: (movieId: string) => boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const local = localStorage.getItem(LOCAL_WATCHLIST_KEY);
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Save user profile record in Firestore if authenticated
      if (currentUser) {
        const profilePath = `users/${currentUser.uid}/profile/info`;
        setDoc(doc(db, profilePath), {
          uid: currentUser.uid,
          displayName: currentUser.displayName || 'Cinema Member',
          email: currentUser.email || '',
          photoURL: currentUser.photoURL || '',
          createdAt: new Date().toISOString()
        }, { merge: true }).catch((err) => {
          handleFirestoreError(err, OperationType.WRITE, profilePath);
        });
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen to Watchlist subcollection in Firestore when user is signed in and merge with local
  useEffect(() => {
    if (!user) return;

    const watchlistPath = `users/${user.uid}/watchlist`;
    const watchlistCol = collection(db, watchlistPath);

    const unsubscribeWatchlist = onSnapshot(
      watchlistCol,
      (snapshot) => {
        const cloudIds: string[] = [];
        snapshot.forEach((docItem) => {
          cloudIds.push(docItem.id);
        });
        setWatchlist((prev) => {
          const merged = Array.from(new Set([...prev, ...cloudIds]));
          try {
            localStorage.setItem(LOCAL_WATCHLIST_KEY, JSON.stringify(merged));
          } catch {}
          return merged;
        });
      },
      (error) => {
        console.warn('Watchlist cloud sync notice:', error?.message || error);
      }
    );

    return () => unsubscribeWatchlist();
  }, [user]);

  const toggleWatchlist = async (movie: Movie) => {
    const alreadySaved = watchlist.includes(movie.id);
    const nextWatchlist = alreadySaved 
      ? watchlist.filter(id => id !== movie.id) 
      : [...watchlist, movie.id];

    // 1. Instant local persistence & UI update
    setWatchlist(nextWatchlist);
    try {
      localStorage.setItem(LOCAL_WATCHLIST_KEY, JSON.stringify(nextWatchlist));
    } catch {}

    // 2. Instant Toast Feedback
    triggerToast(
      alreadySaved 
        ? `تمت إزالة "${movie.title}" من قائمتك المحفوظة`
        : `تم حفظ "${movie.title}" في قائمتك بنجاح! ⭐`
    );

    // 3. Background Cloud Sync if user is logged in
    if (user) {
      const movieDocPath = `users/${user.uid}/watchlist/${movie.id}`;
      try {
        if (alreadySaved) {
          await deleteDoc(doc(db, movieDocPath));
        } else {
          await setDoc(doc(db, movieDocPath), {
            movieId: movie.id,
            title: movie.title,
            posterUrl: movie.posterUrl,
            year: movie.year,
            rating: movie.rating,
            addedAt: new Date().toISOString()
          });
        }
      } catch (err) {
        console.warn('Watchlist sync error:', err);
      }
    }
  };

  const isBookmarked = (movieId: string) => {
    return watchlist.includes(movieId);
  };

  const signIn = async () => {
    try {
      await loginWithGoogle();
    } catch {
      // Handled gracefully in loginWithGoogle
    }
  };

  const signOut = async () => {
    await logoutUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        watchlist,
        toggleWatchlist,
        isBookmarked,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
