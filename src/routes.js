import { useEffect } from 'react';
import { Navigate, useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './views/blog/BlogPage';
import LoginPage from './views/account/LoginPage';
import Page404 from './views/error/Page404';
import ProductsPage from './views/products/ProductsPage';
import DashboardAppPage from './views/dashboard/DashboardAppPage';
// custom
import TempStatusPage from './views/tempStatus/TempStatusPage';
import UserApprovePage from './views/userApprove/UserApprovePage';
import UserMgmtPage from './views/userMgmt/UserMgmtPage';
import AptSetPage from './views/aptSet/AptSetPage';
import ManagerMgmtPage from './views/managerMgmt/ManagerMgmtPage';
import MqttSetPage from './views/mqttSet/MqttSetPage';

// ----------------------------------------------------------------------

export default function Router() {
  console.log('routes.js render');

  const navigate = useNavigate();
  const location = useLocation();

  const userId = useSelector((state) => state.account.userId);
  console.log('routes.js location', location);
  console.log('routes.js userId', userId);
  useEffect(() => {
    if (!userId && location.pathname !== '/login') {
      navigate('/login');
    }
  });

  return (
    <>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/tempStatus" element={<TempStatusPage />} />
          <Route path="/userMgmt" element={<UserMgmtPage />} />
          <Route path="/userApprove" element={<UserApprovePage />} />
          <Route path="/aptSet" element={<AptSetPage />} />
          <Route path="/mamagerMgmt" element={<ManagerMgmtPage />} />
          <Route path="/mqttSet" element={<MqttSetPage />} />
          {/* <Route path="/app" element={<DashboardAppPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/blog" element={<BlogPage />} /> */}
        </Route>
        <Route element={<SimpleLayout />}>
          <Route element={<LoginPage />} index />
          <Route path="/404" element={<Page404 />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      </Routes>
    </>
  );

  // const routes = useRoutes([
  //   {
  //     path: '/dashboard',
  //     element: <DashboardLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" />, index: true },
  //       { path: 'app', element: <DashboardAppPage /> },
  //       { path: 'user', element: <UserPage /> },
  //       { path: 'products', element: <ProductsPage /> },
  //       { path: 'blog', element: <BlogPage /> },
  //     ],
  //   },
  //   {
  //     path: 'login',
  //     element: <LoginPage />,
  //   },
  //   {
  //     element: <SimpleLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" />, index: true },
  //       { path: '404', element: <Page404 /> },
  //       { path: '*', element: <Navigate to="/404" /> },
  //     ],
  //   },
  //   {
  //     path: '*',
  //     element: <Navigate to="/404" replace />,
  //   },
  // ]);

  // return routes;
}
