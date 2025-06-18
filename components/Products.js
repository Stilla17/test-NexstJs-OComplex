'use client'
import { useEffect, useState } from "react"

export default function Products({ selectedItems, setSelectedItems }) {
    const [product, setProduct] = useState([])
    const [openMap, setOpenMap] = useState({})
    const [count, setCount] = useState({})

    // const apiUrlProducts = process.env.NEXT_PUBLIC_PRODUCTS
    const apiUrlProducts = "http://o-complex.com:1337/products?page=1&page_size=20"

    useEffect(() => {
        fetch(apiUrlProducts).then(res => res.json()).then(res => {
            setProduct(res.items)
        })
    }, [])

    const handleChangeButton = (item) => {
        setOpenMap(prev => ({ ...prev, [item.id]: true }))
        setCount(prev => ({ ...prev, [item.id]: 1 }))
        setSelectedItems(prev => ({
            ...prev,
            [item.id]: { title: item.title, price: item.price, quantity: 1 }
        }))
    }

    const increase = (item) => {
        setCount(prev => ({ ...prev, [item.id]: (prev[item.id] || 1) + 1 }))
        setSelectedItems(prev => ({
            ...prev,
            [item.id]: {
                ...prev[item.id],
                quantity: (prev[item.id]?.quantity || 1) + 1
            }
        }))
    }

    const decrease = (item) => {
        setCount(prev => {
            const newVal = Math.max((prev[item.id] || 1) - 1, 1)
            return { ...prev, [item.id]: newVal }
        })

        setSelectedItems(prev => ({
            ...prev,
            [item.id]: {
                ...prev[item.id],
                quantity: Math.max((prev[item.id]?.quantity || 1) - 1, 1)
            }
        }))
    }

    const handleInputChange = (e, item) => {
        const val = parseInt(e.target.value)
        const safeVal = isNaN(val) || val < 1 ? 1 : val
        setCount(prev => ({ ...prev, [item.id]: safeVal }))
        setSelectedItems(prev => ({
            ...prev,
            [item.id]: {
                ...prev[item.id],
                quantity: safeVal
            }
        }))
    }

    return (
        <div className="flex gap-4 flex-wrap my-12 justify-center">
            {
                product.map(item => (
                    <div key={item.id} className="max-w-[300px] py-5 px-7 rounded-2xl bg-[#D9D9D9] flex flex-col justify-between">
                        <img src={item.image_url} className="mx-auto" alt="" />
                        <p className="text-2xl my-2 text-center font-bold">{item.title}</p>
                        <p className="my-2">{item.description}</p>
                        <p className="text-xl text-center font-bold">Цена: {item.price}₽</p>

                        {!openMap[item.id] ? (
                            <button onClick={() => handleChangeButton(item)} className="bg-black my-4 rounded-md text-white w-full text-2xl py-2">
                                Купить
                            </button>
                        ) : (
                            <div className="flex items-center justify-between gap-2 mt-4">
                                <button onClick={() => decrease(item)} className="bg-black text-white px-4 py-2 rounded-md text-4xl">-</button>
                                <input
                                    type="number"
                                    className="w-16 bg-black text-center text-white py-2 rounded-md"
                                    min={1}
                                    value={count[item.id] || 1}
                                    onChange={(e) => handleInputChange(e, item)}
                                />
                                <button onClick={() => increase(item)} className="bg-black text-white px-4 py-2 rounded-md text-4xl">+</button>
                            </div>
                        )}
                    </div>
                ))
            }
        </div>
    )
}
