import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import SignIn from './components/sign_in/sign_in.jsx'
import Layout from './layout.jsx';
import Dashboard from './components/Dashboard/Dashboard'
import Events from './components/Events/Events.jsx';
import Photos from './components/photos/photos.jsx';


const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='Events' element={<Events/>} />
      <Route path='Dashboard' element={<Dashboard/>} />
      <Route path='SignIn' element={<SignIn/>}/>
      <Route path='Photos' element={<Photos/>} />
    </Route>
  )
)
// const appRouter = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout />}>
//       <Route path='Events' element={<Events/>} />
//       <Route path='Dashboard' element={<Dashboard/>} /> {/* Corrected here */}
//       <Route path='SignIn' element={<SignIn/>}/>
//     </Route>
//   )
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
    {/* <App/> */}
  </StrictMode>,
)
