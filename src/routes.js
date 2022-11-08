import { useEffect } from 'react';
import { Navigate, useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './views/blog/BlogPage';
import UserPage from './views/user/UserPage';
import LoginPage from './views/account/LoginPage';
import Page404 from './views/error/Page404';
import ProductsPage from './views/products/ProductsPage';
import DashboardAppPage from './views/dashboard/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
  console.log('routes.js render');

  const navigate = useNavigate();
  const location = useLocation();

  const account = useSelector((state) => state.account);
  console.log('routes.js account', account);
  console.log('routes.js location', location);
  useEffect(() => {
    console.log('routes.js userId', account.userId);
    if (account.userId === '' && location.pathname !== '/login') {
      navigate('/login');
    }
  });

  return (
    <>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/app" element={<DashboardAppPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/blog" element={<BlogPage />} />
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
