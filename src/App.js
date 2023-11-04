import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        
          <Header />
        ),
      children: [
        {
          index: true,
          element: (
            
              <Home />
            
          )
        },
        {
          path: "/login",
          element: (
            
              <Login />
            
          )
        },
        {
          path: "/signup",
          element: (
            
              <Signup />
            
          )
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
