import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import SellerNav from '../components/SellerNav'

function SalesHistory() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const ordersRef = collection(db, 'orders')
    const ordersQuery = query(ordersRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }))

      setOrders(ordersData)
    })

    return () => unsubscribe()
  }, [])

  const formatPrice = (value) => {
    if (!value) return '0'
    return value.toLocaleString('es-CO')
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <SellerNav />

      <section className="mx-auto max-w-7xl pt-20">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
            Panel vendedor
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-6xl">
            Historial de ventas
          </h1>

          <p className="mt-4 max-w-2xl text-gray-300">
            Aquí se muestran los pedidos realizados por los clientes desde el
            personalizador de ramos.
          </p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-pink-400/40 bg-white/10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-pink-500/20">
                <tr>
                  <th className="p-4 text-left">Nombre del comprador</th>
                  <th className="p-4 text-left">Celular</th>
                  <th className="p-4 text-left">Tipo de flor</th>
                  <th className="p-4 text-left">Color</th>
                  <th className="p-4 text-left">Cantidad</th>
                  <th className="p-4 text-left">Papel</th>
                  <th className="p-4 text-left">Método de pago</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Estado</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-pink-400/20"
                  >
                    <td className="p-4 font-bold text-white">
                      {order.buyerName}
                    </td>

                    <td className="p-4 text-gray-300">
                      {order.buyerPhone}
                    </td>

                    <td className="p-4 text-gray-300">
                      {order.flowerType}
                    </td>

                    <td className="p-4 text-gray-300">
                      {order.flowerColor}
                    </td>

                    <td className="p-4 text-gray-300">
                      {order.quantity}
                    </td>

                    <td className="p-4 text-gray-300">
                      {order.paperType}
                    </td>

                    <td className="p-4 text-gray-300">
                      {order.paymentMethod}
                    </td>

                    <td className="p-4 font-bold text-pink-300">
                      ${formatPrice(order.total)}
                    </td>

                    <td className="p-4">
                      <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-bold text-yellow-300">
                        {order.status || 'Pendiente'}
                      </span>
                    </td>
                  </tr>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan="9"
                      className="p-8 text-center text-gray-400"
                    >
                      Todavía no hay ventas registradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  )
}

export default SalesHistory