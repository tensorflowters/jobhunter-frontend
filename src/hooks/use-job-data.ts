import { useQuery } from '@tanstack/react-query';
import { 
  jobOffers, 
  jobSources, 
  dashboardMetrics, 
  getOffersPerSourceData, 
  getApplicationStatusData,
  getOffersPerWeekData
} from '../data/mock-data';

// Fetch dashboard metrics
export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ['dashboardMetrics'],
    queryFn: () => {
      // Simulate API call
      return new Promise(resolve => {
        setTimeout(() => resolve(dashboardMetrics), 500);
      });
    }
  });
};

// Fetch job sources
export const useJobSources = () => {
  return useQuery({
    queryKey: ['jobSources'],
    queryFn: () => {
      // Simulate API call
      return new Promise(resolve => {
        setTimeout(() => resolve(jobSources), 600);
      });
    }
  });
};

// Fetch saved job offers
export const useSavedJobOffers = () => {
  return useQuery({
    queryKey: ['savedJobOffers'],
    queryFn: () => {
      // Simulate API call
      return new Promise(resolve => {
        setTimeout(() => resolve(jobOffers.filter(offer => offer.isSaved)), 700);
      });
    }
  });
};

// Fetch recent saved offers (last 5)
export const useRecentSavedOffers = () => {
  return useQuery({
    queryKey: ['recentSavedOffers'],
    queryFn: () => {
      // Simulate API call
      return new Promise(resolve => {
        const sorted = [...jobOffers]
          .filter(offer => offer.isSaved)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
          
        setTimeout(() => resolve(sorted), 400);
      });
    }
  });
};

// Fetch chart data for offers per source
export const useOffersPerSourceData = () => {
  return useQuery({
    queryKey: ['offersPerSourceData'],
    queryFn: () => {
      // Simulate API call
      return new Promise(resolve => {
        setTimeout(() => resolve(getOffersPerSourceData()), 800);
      });
    }
  });
};

// Fetch chart data for application status
export const useApplicationStatusData = () => {
  return useQuery({
    queryKey: ['applicationStatusData'],
    queryFn: () => {
      // Simulate API call
      return new Promise(resolve => {
        setTimeout(() => resolve(getApplicationStatusData()), 600);
      });
    }
  });
};

// Fetch chart data for offers per week
export const useOffersPerWeekData = () => {
  return useQuery({
    queryKey: ['offersPerWeekData'],
    queryFn: () => {
      // Simulate API call
      return new Promise(resolve => {
        setTimeout(() => resolve(getOffersPerWeekData()), 700);
      });
    }
  });
};
