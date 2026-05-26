import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import toast from 'react-hot-toast'
import { db } from '../firebase/config'
import SellerNav from '../components/SellerNav'

function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([])
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Limpiapipas',
    quantity: '',
    minQuantity: '',
  })

  useEffect(() => {
    const inventoryRef = collection(db, 'inventory')

    const unsubscribe = onSnapshot(inventoryRef, (snapshot) => {
      const items = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }))

      setInventoryItems(items)
    })

    return () => unsubscribe()
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setNewItem({
      ...newItem,
      [name]: value,
    })
  }

  const handleAddItem = async () => {
    if (
      !newItem.name ||
      !newItem.category ||
      !newItem.quantity ||
      !newItem.minQuantity
    ) {
      toast.error('Completa todos los campos del material')
      return
    }

    await addDoc(collection(db, 'inventory'), {
      name: newItem.name,
      category: newItem.category,
      quantity: Number(newItem.quantity),
      minQuantity: Number(newItem.minQuantity),
    })

    toast.success('Material agregado correctamente')

    setNewItem({
      name: '',
      category: 'Limpiapipas',
      quantity: '',
      minQuantity: '',
    })
  }

  const handleUpdateQuantity = async (id, currentQuantity, action) => {
    const newQuantity =
      action === 'increase'
        ? currentQuantity + 1
        : Math.max(0, currentQuantity - 1)

    const itemRef = doc(db, 'inventory', id)

    await updateDoc(itemRef, {
      quantity: newQuantity,
    })

    if (action === 'increase') {
      toast.success('Cantidad aumentada')
    } else {
      toast.success('Cantidad reducida')
    }
  }

  const handleDeleteItem = async (id) => {
    const confirmDelete = confirm('¿Seguro que quieres eliminar este material?')

    if (!confirmDelete) return

    const itemRef = doc(db, 'inventory', id)

    await deleteDoc(itemRef)

    toast.success('Material eliminado correctamente')
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <SellerNav />

      <section className="mx-auto max-w-6xl pt-20">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
            Panel vendedor
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-6xl">
            Inventario Floricienta
          </h1>

          <p className="mt-4 max-w-2xl text-gray-300">
            Aquí la vendedora puede agregar, eliminar y modificar las cantidades
            de los materiales disponibles.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-pink-400/40 bg-white/10 p-6 shadow-2xl">
            <p className="text-gray-300">Total de materiales</p>
            <h2 className="mt-2 text-4xl font-bold text-pink-300">
              {inventoryItems.length}
            </h2>
          </article>

          <article className="rounded-3xl border border-pink-400/40 bg-white/10 p-6 shadow-2xl">
            <p className="text-gray-300">Bajo stock</p>
            <h2 className="mt-2 text-4xl font-bold text-red-400">
              {
                inventoryItems.filter(
                  (item) => item.quantity <= item.minQuantity
                ).length
              }
            </h2>
          </article>

          <article className="rounded-3xl border border-pink-400/40 bg-white/10 p-6 shadow-2xl">
            <p className="text-gray-300">Estado general</p>
            <h2 className="mt-2 text-3xl font-bold text-green-400">
              Conectado
            </h2>
          </article>
        </div>

        <section className="mt-8 rounded-3xl border border-pink-400/40 bg-white/10 p-6 shadow-2xl">
          <h2 className="mb-5 text-2xl font-bold text-pink-300">
            Agregar nuevo material
          </h2>

          <div className="grid gap-4 md:grid-cols-5">
            <input
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              placeholder="Nombre del material"
              className="rounded-2xl border border-pink-400/50 bg-black p-4 text-white outline-none focus:border-pink-300"
            />

            <select
              name="category"
              value={newItem.category}
              onChange={handleInputChange}
              className="rounded-2xl border border-pink-400/50 bg-black p-4 text-white outline-none focus:border-pink-300"
            >
              <option value="Limpiapipas">Limpiapipas</option>
              <option value="Papel">Papel</option>
              <option value="Flores">Flores</option>
              <option value="Tarjetas">Tarjetas</option>
            </select>

            <input
              name="quantity"
              value={newItem.quantity}
              onChange={handleInputChange}
              type="number"
              min="0"
              placeholder="Cantidad"
              className="rounded-2xl border border-pink-400/50 bg-black p-4 text-white outline-none focus:border-pink-300"
            />

            <input
              name="minQuantity"
              value={newItem.minQuantity}
              onChange={handleInputChange}
              type="number"
              min="0"
              placeholder="Mínimo"
              className="rounded-2xl border border-pink-400/50 bg-black p-4 text-white outline-none focus:border-pink-300"
            />

            <button
              type="button"
              onClick={handleAddItem}
              className="rounded-2xl bg-pink-500 p-4 font-bold hover:bg-pink-600"
            >
              Agregar
            </button>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-3xl border border-pink-400/40 bg-white/10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-pink-500/20">
                <tr>
                  <th className="p-4 text-left">Material</th>
                  <th className="p-4 text-left">Categoría</th>
                  <th className="p-4 text-left">Cantidad</th>
                  <th className="p-4 text-left">Cantidad mínima</th>
                  <th className="p-4 text-left">Estado</th>
                  <th className="p-4 text-left">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {inventoryItems.map((item) => {
                  const isLowStock = item.quantity <= item.minQuantity

                  return (
                    <tr
                      key={item.id}
                      className="border-t border-pink-400/20"
                    >
                      <td className="p-4 font-bold text-white">
                        {item.name}
                      </td>

                      <td className="p-4 text-gray-300">
                        {item.category}
                      </td>

                      <td className="p-4 text-gray-300">
                        {item.quantity}
                      </td>

                      <td className="p-4 text-gray-300">
                        {item.minQuantity}
                      </td>

                      <td className="p-4">
                        {isLowStock ? (
                          <span className="rounded-full bg-red-500/20 px-3 py-1 text-sm font-bold text-red-300">
                            Bajo stock
                          </span>
                        ) : (
                          <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-bold text-green-300">
                            Disponible
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                item.quantity,
                                'decrease'
                              )
                            }
                            className="rounded-full border border-pink-400 px-3 py-1 font-bold text-pink-300 hover:bg-pink-500/20"
                          >
                            -
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                item.quantity,
                                'increase'
                              )
                            }
                            className="rounded-full border border-pink-400 px-3 py-1 font-bold text-pink-300 hover:bg-pink-500/20"
                          >
                            +
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.id)}
                            className="rounded-full bg-red-500/20 px-3 py-1 font-bold text-red-300 hover:bg-red-500/30"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}

                {inventoryItems.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-8 text-center text-gray-400"
                    >
                      No hay materiales registrados todavía.
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

export default Inventory