import React from 'react';
import { Route, useParams } from 'react-router-dom';

// Wrapper component to pass router params into route components
function RouteElementWrapper({ component: Component }) {
  const params = useParams();
  return <Component params={params} />;
}

export const routes = [
  {
    path: '/',
    component: () => (
      <div>
        <h1 className="fw-bold text-primary mb-2">Home Page</h1>
        <p className="text-secondary">Welcome to the Home Page of Decoupled Router!</p>
      </div>
    ),
    exact: true,
  },
  {
    path: '/products',
    component: () => (
      <div>
        <h1 className="fw-bold text-success mb-2">Products Page</h1>
        <p className="text-secondary">Browse our collection of products here.</p>
      </div>
    ),
  },
  {
    path: '/about',
    component: () => (
      <div>
        <h1 className="fw-bold text-info mb-2">About Page</h1>
        <p className="text-secondary">Learn more about our team and mission.</p>
      </div>
    ),
  },
  {
    path: '/contact',
    component: () => (
      <div>
        <h1 className="fw-bold text-warning mb-2">Contact Page</h1>
        <p className="text-secondary">Get in touch with us anytime.</p>
      </div>
    ),
  },
  {
    path: '/users',
    component: ({ params }) => (
      <div>
        <h1 className="fw-bold text-danger mb-2">User Profile: {params?.userId || 'Guest (No ID)'}</h1>
        <p className="text-secondary">Viewing profile without specific User ID parameter.</p>
      </div>
    ),
  },
  {
    path: '/users/:userId',
    component: ({ params }) => (
      <div>
        <h1 className="fw-bold text-danger mb-2">User Profile: {params?.userId || 'Guest'}</h1>
        <p className="text-secondary">Dynamic route parameter extracted: <code>userId = {params?.userId}</code></p>
      </div>
    ),
  },
];

export const renderRoutes = () => {
  return routes.map((route, index) => {
    const Component = route.component;
    return (
      <Route
        key={index}
        path={route.path}
        element={<RouteElementWrapper component={Component} />}
        exact={route.exact}
      />
    );
  });
};
