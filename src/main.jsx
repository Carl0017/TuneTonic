import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Router} from 'react-router-dom'
import './index.scss'


//pages
import App from './Pages/Home/App'
import SportifySearch from './Pages/SpotifySearch/App'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/Search",
    element: <SportifySearch />,
  }

  

]);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
