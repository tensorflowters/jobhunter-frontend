import { Router, Route, RootRoute } from '@tanstack/react-router';
import App from '../App';
import { HomePage } from '../components/pages/home';
import { SavedOffersPage } from '../components/pages/saved-offers';
import { SourcesPage } from '../components/pages/sources';

// Define routes
const rootRoute = new RootRoute({
  component: App,
});

// Home route (Dashboard)
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

// Saved Offers route
const savedOffersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/saved-offers',
  component: SavedOffersPage,
});

// Sources route
const sourcesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/sources',
  component: SourcesPage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  savedOffersRoute,
  sourcesRoute,
]);

// Create the router
export const router = new Router({ routeTree });

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
