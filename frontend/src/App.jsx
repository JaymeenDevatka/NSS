// import React from 'react';
// import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
// import SignIn from './components/sign_in/sign_in';
// import SignUp from './components/sign_up/sign_up';
// import Dashboard from './components/Dashboard/Dashboard';
// import Feedback from './components/EventFeedBack/Feedback';
// import LandingPage from './components/Landing/landingpage';
// import Events from './components/Events/Events';
// import Photos from './components/Photos/Photos';
// import CertificatesTable from './components/CertificateGenerator/CertificateTable';

// const isAuthenticated = () => {
//   return localStorage.getItem('authToken') !== null;
// };

// const ProtectedRoute = ({ children }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/signin" replace />;
//   }
//   return children;
// };

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <LandingPage />,
//   },
//   {
//     path: '/signin',
//     element: <SignIn />,
//   },
//   {
//     path: '/signup',
//     element: <SignUp />,
//   },
//   {
//     path: '/dashboard',
//     element: (
//       <ProtectedRoute>
//         <Dashboard />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/events',
//     element: (
//       <ProtectedRoute>
//         <Events />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/photos',
//     element: (
//       <ProtectedRoute>
//         <Photos />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/feedback',
//     element: (
//       <ProtectedRoute>
//         <Feedback />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/certificate',
//     element: (
//       <ProtectedRoute>
//         <CertificatesTable/>
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '*',
//     element: (
//       <div className="flex items-center justify-center h-screen">
//         <h1 className="text-3xl font-bold text-gray-700">404 - Page Not Found</h1>
//       </div>
//     ),
//   },
// ]);

// const App = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <RouterProvider router={router} />
//     </div>
//   );
// };

// export default App;


// // import { Router } from 'express';
// // import react from 'react';

// // const App = () =>
// // {
// //   return (
// //     <div>
// //       <Router>
// //         <Route path='/si'
// //       </Router>
// //     </div>
// //   )
// // }

// // import React from 'react';
// // import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// // import SignIn from './components/sign_in/sign_in';
// // import SignUp from './components/sign_up/sign_up';
// // import Dashboard from './components/Dashboard/Dashboard';
// // import Feedback from './components/EventFeedBack/Feedback';
// // import Certificate from './components/CertificateGenerator/certificate';
// // import LandingPage from './components/Landing/landingpage';
// // import Events from './components/Events/Events';
// // import Photos from './components/Photos/Photos';

// // const isAuthenticated = () => {
// //   return localStorage.getItem('authToken') !== null;
// // };

// // const ProtectedRoute = ({ component: Component, ...rest }) => (
// //   <Route
// //     {...rest}
// //     render={(props) =>
// //       isAuthenticated() ? <Component {...props} /> : <Redirect to="/signin" />
// //     }
// //   />
// // );

// // const App = () => {
// //   return (
// //     <div className="flex flex-col min-h-screen">
// //       <Router>
// //         <Switch>
// //           <Route exact path="/" component={LandingPage} />
// //           <Route path="/signin" component={SignIn} />
// //           <Route path="/signup" component={SignUp} />
// //           <ProtectedRoute path="/dashboard" component={Dashboard} />
// //           <ProtectedRoute path="/events" component={Events} />
// //           <ProtectedRoute path="/photos" component={Photos} />
// //           <ProtectedRoute path="/feedback" component={Feedback} />
// //           <ProtectedRoute path="/certificate" component={Certificate} />
// //           <Route
// //             component={() => (
// //               <div className="flex items-center justify-center h-screen">
// //                 <h1 className="text-3xl font-bold text-gray-700">404 - Page Not Found</h1>
// //               </div>
// //             )}
// //           />
// //         </Switch>
// //       </Router>
// //     </div>
// //   );
// // };

// // export default App;

// // import React from 'react';
// // import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// // import SignIn from './components/sign_in/sign_in';
// // import SignUp from './components/sign_up/sign_up';

// // const App = () => {
// //   return (
// //     <Router>
// //       <Switch>
// //         <Route exact path="/" component={SignIn} />
// //         <Route path="/signin" component={SignIn} />
// //         <Route path="/signup" component={SignUp} />
// //         <Route
// //           component={() => (
// //             <div className="flex items-center justify-center h-screen">
// //               <h1 className="text-3xl font-bold text-gray-700">404 - Page Not Found</h1>
// //             </div>
// //           )}
// //         />
// //       </Switch>
// //     </Router>
// //   );
// // };

// // export default App;
import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import SignIn from './components/sign_in/sign_in';
import SignUp from './components/sign_up/sign_up';
import Dashboard from './components/Dashboard/Dashboard';
import Feedback from './components/EventFeedBack/Feedback';
import LandingPage from './components/Landing/landingpage';
import Events from './components/Events/Events';
import Photos from './components/Photos/Photos';
import CertificateTable from './components/CertificateGenerator/CertificateTable';

const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
};

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: '/events',
    element: <ProtectedRoute><Events /></ProtectedRoute>,
  },
  {
    path: '/photos',
    element: <ProtectedRoute><Photos /></ProtectedRoute>,
  },
  {
    path: '/feedback',
    element: <ProtectedRoute><Feedback /></ProtectedRoute>,
  },
  {
    path: '/registrations',
    element: <ProtectedRoute><CertificateTable /></ProtectedRoute>,
  },
  {
    path: '*',
    element: (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-gray-700">404 - Page Not Found</h1>
      </div>
    ),
  },
]);

const App = () => (
  <div className="flex flex-col min-h-screen">
    <RouterProvider router={router} />
  </div>
);

export default App;
