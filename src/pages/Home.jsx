import { useNavigate } from 'react-router-dom'

import ramoRosas from '../assets/ramo-rosas.jpg'
import ramoGirasol from '../assets/ramo-girasol.jpg'
import ramoMargaritas from '../assets/ramo-margaritas.jpg'

const bouquetExamples = [
  {
    name: 'Ramo de Rosas Rojas',
    description: 'Ramo preparado con 3 rosas rojas y papel coreano.',
    flowers: '3 rosas',
    color: 'Rojo',
    paper: 'Papel coreano',
    flowerPrice: 3000,
    paperPrice: 3000,
    total: 12000,
    image: ramoRosas,
  },
  {
    name: 'Ramo de Girasol Amarillo',
    description: 'Ramo preparado con 1 girasol amarillo y papel perlado blanco.',
    flowers: '1 girasol',
    color: 'Amarillo',
    paper: 'Papel perlado blanco',
    flowerPrice: 4000,
    paperPrice: 3500,
    total: 7500,
    image: ramoGirasol,
  },
  {
    name: 'Ramo de Margaritas Blancas',
    description: 'Ramo preparado con 35 margaritas blancas y papel kraft.',
    flowers: '35 margaritas',
    color: 'Blanco',
    paper: 'Papel kraft',
    flowerPrice: 2500,
    paperPrice: 2500,
    total: 90000,
    image: ramoMargaritas,
  },
]

function Home() {
  const navigate = useNavigate()

  const formatPrice = (value) => {
    return value.toLocaleString('es-CO')
  }

  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white">
      <button
  onClick={() => navigate('/login')}
  className="fixed left-5 top-5 z-10 rounded-full border border-pink-400/60 px-4 py-2 text-sm font-bold text-pink-300 hover:bg-pink-500/20"
>
  Soy vendedor
</button>

      <section className="mx-auto flex max-w-6xl flex-col items-center justify-center pt-20 text-center">
        <div className="max-w-3xl rounded-3xl border border-pink-400/50 bg-white/10 p-10 shadow-2xl">
          <p className="mb-4 text-pink-300 tracking-widest">
            Ramos personalizados hechos con limpiapipas
          </p>

          <h1 className="mb-6 text-6xl font-bold text-white">
            Floricienta
          </h1>

          <p className="mb-8 text-lg text-gray-200">
            Crea tu ramo ideal escogiendo la cantidad de flores, el tipo de
            flor, el color, el papel y el mensaje de la tarjeta. Luego podrás
            enviar tu pedido directamente por WhatsApp.
          </p>

          <button
            onClick={() => navigate('/personalizar')}
            className="rounded-full bg-pink-500 px-8 py-4 font-bold hover:bg-pink-600"
          >
            Personalizar mi ramo
          </button>
        </div>

        <section className="mt-12 w-full">
          <h2 className="mb-6 text-3xl font-bold text-pink-300">
            Ejemplos de ramos preparados
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {bouquetExamples.map((bouquet) => (
              <article
                key={bouquet.name}
                className="rounded-3xl border border-pink-400/40 bg-white/10 p-6 text-left shadow-2xl"
              >
                <div className="mb-5 h-44 overflow-hidden rounded-2xl border border-pink-400/30 bg-pink-500/10">
                  <img
                    src={bouquet.image}
                    alt={bouquet.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mb-3 text-xl font-bold text-pink-300">
                  {bouquet.name}
                </h3>

                <p className="mb-4 text-gray-300">
                  {bouquet.description}
                </p>

                <div className="space-y-2 text-sm text-gray-200">
                  <p>
                    <span className="font-bold text-white">Flores:</span>{' '}
                    {bouquet.flowers}
                  </p>

                  <p>
                    <span className="font-bold text-white">Color:</span>{' '}
                    {bouquet.color}
                  </p>

                  <p>
                    <span className="font-bold text-white">Papel:</span>{' '}
                    {bouquet.paper}
                  </p>

                  <p>
                    <span className="font-bold text-white">
                      Valor flores:
                    </span>{' '}
                    ${formatPrice(bouquet.flowerPrice)}
                  </p>

                  <p>
                    <span className="font-bold text-white">
                      Valor papel:
                    </span>{' '}
                    ${formatPrice(bouquet.paperPrice)}
                  </p>

                  <p className="pt-3 text-lg font-bold text-pink-300">
                    Total: ${formatPrice(bouquet.total)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default Home