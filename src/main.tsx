import React from 'react'
import ReactDOM from 'react-dom/client'
import AppLayout from './AppLayout';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import SignUpForm from './Components/SignUpForm';
import UserDashboard from './Components/UserDashboard';
import Body from './Components/Body';
import ViewCourse from './Components/ViewCourse';
import AllCourses from './Components/AllCourses';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        element: <Body/>
      },
      {
        path: '/user/signup',
        element: <SignUpForm/>
      },
      {
        path: '/user/dashboard',
        element: <UserDashboard/>
      }, 
      {
        path: '/user/courses/:courseId',
        element: <ViewCourse />
      },
      {
        path: '/user/courses',
        element: <AllCourses/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>
);
