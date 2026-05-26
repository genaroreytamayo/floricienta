import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
import { auth } from '../firebase/config'

function SellerNav() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    toast.success('Sesión cerrada correctamente')
    navigate('/login')
  }

  return (
    <>
      <div className="fixed left-5 top-5 z-10 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => navigate('/inventario')}
          className="rounded-full border border-pink-400/60 px-4 py-2 text-sm font-bold text-pink-300 hover:bg-pink-500/20"
        >
          Inventario
        </button>

        <button
          type="button"
          onClick={() => navigate('/historial-ventas')}
          className="rounded-full border border-pink-400/60 px-4 py-2 text-sm font-bold text-pink-300 hover:bg-pink-500/20"
        >
          Historial ventas
        </button>
      </div>

      <div className="fixed right-5 top-5 z-10 flex gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-full border border-pink-400/60 px-4 py-2 text-sm font-bold text-pink-300 hover:bg-pink-500/20"
        >
          Volver
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-bold text-red-300 hover:bg-red-500/30"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  )
}

export default SellerNav