export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  posterUrl: string;
  backdropUrl: string;
  year: number;
  rating: number;
  genre: string[];
  duration: string;
  synopsis: string;
  trailerUrl: string;
  releaseDate?: string;
  isUpcoming: boolean;
  isFeatured?: boolean;
  type?: 'movie' | 'series';
  director?: string;
  cast?: string[];
  spotlightReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
  category: string;
  date: string;
  source?: string;
  isHot?: boolean;
  createdAt?: string;
}

export type GenreFilter = 
  | 'All'
  | 'Watchlist'
  | 'Sci-Fi'
  | 'Drama'
  | 'Action'
  | 'Thriller'
  | 'Crime'
  | 'Adventure'
  | 'Animation';

export interface AdBannerItem {
  id: string;
  placement: 'header' | 'feed' | 'mid' | 'footer';
  title: string;
  subtitle: string;
  imageUrl?: string;
  targetUrl: string;
  buttonText: string;
  badgeText: string;
  sponsorName: string;
  isActive: boolean;
}

export interface AdSettings {
  enabled: boolean;
  networkType: 'adsense' | 'custom' | 'both';
  adsensePublisherId: string; // e.g. ca-pub-1234567890123456
  adsenseHeaderSlotId?: string;
  adsenseFeedSlotId?: string;
  adsenseMidSlotId?: string;
  adsenseFooterSlotId?: string;
  customBanners: AdBannerItem[];
  updatedAt?: string;
}
