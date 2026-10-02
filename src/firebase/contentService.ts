import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './config';
import { Movie, NewsItem, AdSettings } from '../types';
import { MOVIES_DATA, NEWS_DATA } from '../data/mockData';
import { DEFAULT_AD_SETTINGS } from '../data/defaultAds';

const MOVIES_COLLECTION = 'movies';
const NEWS_COLLECTION = 'news';
const SETTINGS_COLLECTION = 'settings';
const ADS_DOC_ID = 'ads';
const ADS_LOCAL_KEY = 'cinemaworld_ad_settings';

/**
 * Real-time subscription to movies collection with fallback
 */
export function subscribeToMovies(callback: (movies: Movie[]) => void) {
  const colRef = collection(db, MOVIES_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        callback(MOVIES_DATA);
      } else {
        const firestoreMovies: Movie[] = [];
        snapshot.forEach((docSnap) => {
          firestoreMovies.push(docSnap.data() as Movie);
        });
        
        // Merge with defaults so any missing default movies remain available
        const firestoreIds = new Set(firestoreMovies.map(m => m.id));
        const merged = [...firestoreMovies];
        for (const defaultMovie of MOVIES_DATA) {
          if (!firestoreIds.has(defaultMovie.id)) {
            merged.push(defaultMovie);
          }
        }
        callback(merged);
      }
    },
    (err) => {
      console.warn('Falling back to local movies data due to Firestore listener notice:', err?.message || err);
      callback(MOVIES_DATA);
    }
  );
}

/**
 * Save (create or update) movie in Firestore
 */
export async function saveMovie(movie: Movie): Promise<void> {
  const movieRef = doc(db, MOVIES_COLLECTION, movie.id);
  const dataToSave = {
    ...movie,
    updatedAt: new Date().toISOString()
  };
  try {
    await setDoc(movieRef, dataToSave, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `movies/${movie.id}`);
  }
}

/**
 * Delete movie from Firestore
 */
export async function removeMovie(movieId: string): Promise<void> {
  const movieRef = doc(db, MOVIES_COLLECTION, movieId);
  try {
    await deleteDoc(movieRef);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `movies/${movieId}`);
  }
}

/**
 * Set a specific movie as the hero featured movie and unset others
 */
export async function setHeroFeaturedMovie(movieId: string, allMovies: Movie[]): Promise<void> {
  for (const m of allMovies) {
    const isTarget = m.id === movieId;
    if (m.isFeatured !== isTarget) {
      await saveMovie({ ...m, isFeatured: isTarget });
    }
  }
}

/**
 * Helper to sort news items chronologically: newest publication date / creation first
 */
export function sortNewsByLatest(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    const timeA = a.date ? new Date(a.date).getTime() : 0;
    const timeB = b.date ? new Date(b.date).getTime() : 0;
    if (timeB !== timeA) {
      return timeB - timeA;
    }

    const createdA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const createdB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    if (createdB !== createdA) {
      return createdB - createdA;
    }

    const idA = Number(a.id?.replace(/\D/g, '')) || 0;
    const idB = Number(b.id?.replace(/\D/g, '')) || 0;
    return idB - idA;
  });
}

/**
 * Real-time subscription to news collection with fallback
 */
export function subscribeToNews(callback: (news: NewsItem[]) => void) {
  const colRef = collection(db, NEWS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        callback(sortNewsByLatest(NEWS_DATA));
      } else {
        const firestoreNews: NewsItem[] = [];
        snapshot.forEach((docSnap) => {
          firestoreNews.push(docSnap.data() as NewsItem);
        });

        // Merge with defaults
        const firestoreIds = new Set(firestoreNews.map(n => n.id));
        const merged = [...firestoreNews];
        for (const defaultNews of NEWS_DATA) {
          if (!firestoreIds.has(defaultNews.id)) {
            merged.push(defaultNews);
          }
        }
        callback(sortNewsByLatest(merged));
      }
    },
    (err) => {
      console.warn('Falling back to local news data due to Firestore listener notice:', err?.message || err);
      callback(sortNewsByLatest(NEWS_DATA));
    }
  );
}

/**
 * Save (create or update) news item in Firestore
 */
export async function saveNews(newsItem: NewsItem): Promise<void> {
  const newsRef = doc(db, NEWS_COLLECTION, newsItem.id);
  const dataToSave = {
    ...newsItem,
    createdAt: newsItem.createdAt || new Date().toISOString()
  };
  try {
    await setDoc(newsRef, dataToSave, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `news/${newsItem.id}`);
  }
}

/**
 * Delete news item from Firestore
 */
export async function removeNews(newsId: string): Promise<void> {
  const newsRef = doc(db, NEWS_COLLECTION, newsId);
  try {
    await deleteDoc(newsRef);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `news/${newsId}`);
  }
}

/**
  * Subscribe to Ad Settings
  */
export function subscribeToAdSettings(callback: (settings: AdSettings) => void) {
  // Check local cache first
  try {
    const cached = localStorage.getItem(ADS_LOCAL_KEY);
    if (cached) {
      callback(JSON.parse(cached));
    } else {
      callback(DEFAULT_AD_SETTINGS);
    }
  } catch {
    callback(DEFAULT_AD_SETTINGS);
  }

  const docRef = doc(db, SETTINGS_COLLECTION, ADS_DOC_ID);
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as AdSettings;
        try {
          localStorage.setItem(ADS_LOCAL_KEY, JSON.stringify(data));
        } catch {}
        callback(data);
      } else {
        // Doc doesn't exist yet in Firestore, use default
        callback(DEFAULT_AD_SETTINGS);
      }
    },
    (err) => {
      console.warn('Ad settings listener notice (using fallback):', err?.message || err);
      try {
        const cached = localStorage.getItem(ADS_LOCAL_KEY);
        callback(cached ? JSON.parse(cached) : DEFAULT_AD_SETTINGS);
      } catch {
        callback(DEFAULT_AD_SETTINGS);
      }
    }
  );
}

/**
 * Save Ad Settings
 */
export async function saveAdSettings(settings: AdSettings): Promise<void> {
  const settingsToSave: AdSettings = {
    ...settings,
    updatedAt: new Date().toISOString()
  };

  // Immediate local cache
  try {
    localStorage.setItem(ADS_LOCAL_KEY, JSON.stringify(settingsToSave));
  } catch {}

  const docRef = doc(db, SETTINGS_COLLECTION, ADS_DOC_ID);
  try {
    await setDoc(docRef, settingsToSave, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `settings/${ADS_DOC_ID}`);
  }
}

