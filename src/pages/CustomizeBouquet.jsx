import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { db } from '../firebase/config'

const flowerOptions = [
  {
    name: 'Rosas',
    price: 3000,
  },
  {
    name: 'Tulipanes',
    price: 3500,
  },
  {
    name: 'Margaritas',
    price: 2500,
  },
  {
    name: 'Girasoles',
    price: 4000,
  },
]

const paperOptions = [
  {
    name: 'Papel coreano rosado',
    price: 3000,
  },
  {
    name: 'Papel kraft',
    price: 2500,
  },
  {
    name: 'Papel perlado blanco',
    price: 3500,
  },
  {
    name: 'Papel negro elegante',
    price: 4000,
  },
]

const colorOptions = [
  'Rosado',
  'Rojo',
  'Blanco',
  'Amarillo',
  'Morado',
  'Azul',
  'Negro',
]

function CustomizeBouquet() {
  const navigate = useNavigate()

  const [buyerName, setBuyerName] = useState('')
  const [buyerPhone, setBuyerPhone] = useState('')
  const [quantity, setQuantity] = useState(9)
  const [flowerType, setFlowerType] = useState('Rosas')
  const [flowerColor, setFlowerColor] = useState('Rosado')
  const [paperType, setPaperType] = useState('Papel coreano rosado')
  const [cardMessage, setCardMessage] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Efectivo')
  const [loading, setLoading] = useState(false)

  const selectedFlower = flowerOptions.find(
    (flower) => flower.name === flowerType
  )

  const selectedPaper = paperOptions.find(
    (paper) => paper.name === paperType
  )

  const flowersTotal = useMemo(() => {
    return quantity * selectedFlower.price
  }, [quantity, selectedFlower])

  const total = flowersTotal + selectedPaper.price

  const formatPrice = (value) => {
    return value.toLocaleString('es-CO')
  }

  const handleConfirmOrder = async () => {
    if (!buyerName || !buyerPhone) {
      toast.error('Por favor escribe tu nombre y número de celular')
      return
    }

    if (!cardMessage) {
      toast.error('Por favor escribe el mensaje de la tarjeta')
      return
    }

    try {
      setLoading(true)

      const orderData = {
        buyerName,
        buyerPhone,
        flowerType,
        flowerColor,
        quantity,
        paperType,
        cardMessage,
        paymentMethod,
        flowerPrice: selectedFlower.price,
        paperPrice: selectedPaper.price,
        flowersTotal,
        total,
        status: 'Pendiente',
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, 'orders'), orderData)

      toast.success('Pedido guardado correctamente')

      const storePhone = '573247443050'

      const message = `
NUEVO PEDIDO - FLORICIENTA

Nombre del comprador: ${buyerName}
Celular: ${buyerPhone}

Tipo de flor: ${flowerType}
Color de flores/limpiapipas: ${flowerColor}
Numero de flores: ${quantity}
Tipo de papel: ${paperType}

Mensaje para la tarjeta:
${cardMessage}

Metodo de pago: ${paymentMethod}

Detalle del pedido:
${quantity} ${flowerType} color ${flowerColor} x $${formatPrice(
  selectedFlower.price
)} = $${formatPrice(flowersTotal)}
${paperType} = $${formatPrice(selectedPaper.price)}

Total a pagar: $${formatPrice(total)}
`

      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${storePhone}?text=${encodedMessage}`

      window.open(whatsappUrl, '_blank')
    } catch (error) {
      console.error(error)
      toast.error('No se pudo guardar el pedido')
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

      <section className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
            Floricienta
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-6xl">
            Personaliza tu ramo
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Escoge la cantidad de flores, el tipo de flor, el color, el papel
            del ramo y escribe el mensaje que irá en la tarjeta.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-3xl border border-pink-400/40 bg-white/10 p-6 shadow-2xl">
            <h2 className="mb-6 text-2xl font-bold text-pink-300">
              Datos del comprador
            </h2>

            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <input
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="rounded-2xl border border-pink-400/50 bg-black p-4 text-white outline-none focus:border-pink-300"
                placeholder="Nombre del comprador"
              />

              <input
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className="rounded-2xl border border-pink-400/50 bg-black p-4 text-white outline-none focus:border-pink-300"
                placeholder="Número de celular"
              />
            </div>

            <h2 className="mb-6 text-2xl font-bold text-pink-300">
              Configuración del ramo
            </h2>

            <div className="grid gap-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold">
                    Cantidad de flores
                  </label>

                  <div className="flex w-fit items-center rounded-full bg-pink-400/20 p-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 rounded-full bg-pink-500 font-bold hover:bg-pink-600"
                    >
                      -
                    </button>

                    <span className="px-8 text-xl font-bold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10 rounded-full bg-pink-500 font-bold hover:bg-pink-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-semibold">
                    Color de flores
                  </label>

                  <select
                    value={flowerColor}
                    onChange={(e) => setFlowerColor(e.target.value)}
                    className="w-full rounded-2xl border border-pink-400/50 bg-black p-4 text-white outline-none focus:border-pink-300"
                  >
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Tipo de flor
                </label>

                <select
                  value={flowerType}
                  onChange={(e) => setFlowerType(e.target.value)}
                  className="w-full rounded-2xl border border-pink-400/50 bg-black p-4 text-white outline-none focus:border-pink-300"
                >
                  {flowerOptions.map((flower) => (
                    <option key={flower.name} value={flower.name}>
                      {flower.name} - ${formatPrice(flower.price)} c/u
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Tipo de papel
                </label>

                <select
                  value={paperType}
                  onChange={(e) => setPaperType(e.target.value)}
                  className="w-full rounded-2xl border border-pink-400/50 bg-black p-4 text-white outline-none focus:border-pink-300"
                >
                  {paperOptions.map((paper) => (
                    <option key={paper.name} value={paper.name}>
                      {paper.name} - ${formatPrice(paper.price)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Mensaje para la tarjeta
                </label>

                <textarea
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  className="min-h-36 w-full rounded-2xl border border-pink-400/50 bg-black p-4 text-white outline-none focus:border-pink-300"
                  placeholder="Escribe aquí el mensaje que irá en la tarjeta"
                />
              </div>
            </div>
          </section>

          <aside className="rounded-3xl border border-pink-400/40 bg-white/10 p-6 shadow-2xl">
            <h2 className="mb-6 text-2xl font-bold text-pink-300">
              Resumen del pedido
            </h2>

            <div className="space-y-4 text-gray-200">
              <p>
                <span className="font-bold text-white">Comprador:</span>{' '}
                {buyerName || 'Sin nombre'}
              </p>

              <p>
                <span className="font-bold text-white">Celular:</span>{' '}
                {buyerPhone || 'Sin celular'}
              </p>

              <p>
                <span className="font-bold text-white">Flores:</span>{' '}
                {quantity} {flowerType}
              </p>

              <p>
                <span className="font-bold text-white">Color:</span>{' '}
                {flowerColor}
              </p>

              <p>
                <span className="font-bold text-white">Papel:</span>{' '}
                {paperType}
              </p>

              <p>
                <span className="font-bold text-white">Tarjeta:</span>{' '}
                {cardMessage || 'Sin mensaje'}
              </p>
            </div>

            <div className="my-6 h-px bg-pink-400/30" />

            <div className="space-y-3 text-gray-200">
              <p>
                Valor flores: ${formatPrice(selectedFlower.price)} x {quantity}{' '}
                ={' '}
                <span className="font-bold text-white">
                  ${formatPrice(flowersTotal)}
                </span>
              </p>

              <p>
                Valor papel:{' '}
                <span className="font-bold text-white">
                  ${formatPrice(selectedPaper.price)}
                </span>
              </p>

              <p className="text-2xl font-bold text-pink-300">
                Total: ${formatPrice(total)}
              </p>
            </div>

            <div className="my-6">
              <h3 className="mb-3 font-bold">
                Método de pago
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Efectivo')}
                  className={`rounded-full px-4 py-3 font-bold ${
                    paymentMethod === 'Efectivo'
                      ? 'bg-pink-500 text-white'
                      : 'border border-pink-400 text-pink-300'
                  }`}
                >
                  Efectivo
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Transferencia')}
                  className={`rounded-full px-4 py-3 font-bold ${
                    paymentMethod === 'Transferencia'
                      ? 'bg-pink-500 text-white'
                      : 'border border-pink-400 text-pink-300'
                  }`}
                >
                  Transferencia
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirmOrder}
              disabled={loading}
              className="w-full rounded-full bg-pink-500 px-8 py-4 text-lg font-bold hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Guardando pedido...' : 'Confirmar pedido'}
            </button>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default CustomizeBouquet