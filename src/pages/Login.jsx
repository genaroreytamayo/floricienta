import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import toast from 'react-hot-toast'
import { auth } from '../firebase/config'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Por favor escribe el correo y la contraseña')
      return
    }

    try {
      setLoading(true)

      await signInWithEmailAndPassword(auth, email, password)

      toast.success('Inicio de sesión correcto')
      navigate('/inventario')
    } catch (error) {
      console.error(error)
      toast.error('Correo o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="fixed right-5 top-5 z-10 rounded-full border border-pink-400/60 px-4 py-2 text-sm font-bold text-pink-300 hover:bg-pink-500/20"
      >
        Volver
      </button>

      <section className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-pink-400/40 bg-white/10 p-8 shadow-2xl">
          <p className="mb-3 text-center text-sm uppercase tracking-[0.3em] text-pink-300">
            Floricienta
          </p>

          <h1 className="mb-6 text-center text-4xl font-bold">
            Acceso vendedor
          </h1>

          <div className="grid gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="rounded-2xl border border-pink-400/50 bg-black p-4 text-white outline-none focus:border-pink-300"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="rounded-2xl border border-pink-400/50 bg-black p-4 text-white outline-none focus:border-pink-300"
            />

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="mt-3 rounded-full bg-pink-500 px-8 py-4 font-bold hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Esta sección es solo para la persona encargada de administrar los
            pedidos y el inventario.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login