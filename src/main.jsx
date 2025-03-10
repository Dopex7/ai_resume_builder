import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SignInPage from './auth/sign-in/index.jsx'
import App from './App.jsx'
import Home from './home/index.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './dashboard'
import { ClerkProvider } from '@clerk/clerk-react'

import { 
  Link,           // For navigation links
  NavLink,        // For navigation with active states
  useNavigate,    // Hook for programmatic navigation
  useParams,      // Hook for accessing URL parameters
  Outlet          // For nested routes
} from 'react-router-dom'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


const router = createBrowserRouter([

  {
    element: <App />,
    children:[
 
      {
        path: '/dashboard', 
        element: <Dashboard />
      }
    ]
  },

  {
    path: '/', 
    element: <Home />

  },

  { 
    path: '/auth/sign-in', 
    element: <SignInPage />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router} />
    </ClerkProvider>

  </StrictMode>
)
