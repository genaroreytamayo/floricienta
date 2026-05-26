import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import CustomizeBouquet from './pages/CustomizeBouquet'
import Login from './pages/Login'
import Inventory from './pages/Inventory'
import SalesHistory from './pages/SalesHistory'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#fff',
            border: '1px solid rgba(244, 114, 182, 0.5)',
          },
          success: {
            iconTheme: {
              primary: '#ec4899',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personalizar" element={<CustomizeBouquet />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/inventario"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/historial-ventas"
          element={
            <ProtectedRoute>
              <SalesHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App