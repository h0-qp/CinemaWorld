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
  const [watchlist, setWatchlist] = useState<string[]>([]);

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

  // Listen to Watchlist subcollection in Firestore when user is signed in
  useEffect(() => {
    if (!user) {
      setWatchlist([]);
      return;
    }

    const watchlistPath = `users/${user.uid}/watchlist`;
    const watchlistCol = collection(db, watchlistPath);

    const unsubscribeWatchlist = onSnapshot(
      watchlistCol,
      (snapshot) => {
        const ids: string[] = [];
        snapshot.forEach((docItem) => {
          ids.push(docItem.id);
        });
        setWatchlist(ids);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, watchlistPath);
      }
    );

    return () => unsubscribeWatchlist();
  }, [user]);

  const toggleWatchlist = async (movie: Movie) => {
    if (!user) {
      await loginWithGoogle();
      return;
    }

    const movieDocPath = `users/${user.uid}/watchlist/${movie.id}`;
    const alreadySaved = watchlist.includes(movie.id);

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
      handleFirestoreError(err, alreadySaved ? OperationType.DELETE : OperationType.WRITE, movieDocPath);
    }
  };

  const isBookmarked = (movieId: string) => {
    return watchlist.includes(movieId);
  };

  const signIn = async () => {
    await loginWithGoogle();
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
