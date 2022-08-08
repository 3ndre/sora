import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';


// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'explore', element: <Spaces /> },
        { path: 'profile', element: <Profile/> },
        { path: 'space', element: <SpacePage/> },
        { path: 'create', element: <CreateSpace/> },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'connect', element: <Connect/> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}


// Dashboard
const Home = Loadable(lazy(() => import('../pages/Home')));
const Spaces = Loadable(lazy(() => import('../pages/Spaces')));
const CreateSpace = Loadable(lazy(() => import('../pages/CreateSpace')));
const Connect = Loadable(lazy(() => import('../pages/Connect')));
const Profile = Loadable(lazy(() => import('../pages/Profile')));
const SpacePage = Loadable(lazy(() => import('../pages/SpacePage')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
