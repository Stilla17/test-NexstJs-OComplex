export default function OrderSummary({ selectedItems }) {
    const total = Object.values(selectedItems).reduce((sum, item) => {
        return sum + item.price * item.quantity
    }, 0)

    return (
        <div className="flex justify-center mt-32">
            <div className="bg-gray-300 p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Добавленные товары</h2>

                <div className="mb-6 space-y-2">
                    {Object.entries(selectedItems).map(([id, item]) => (
                        <div key={id} clasgit initsName="flex justify-between items-center text-gray-700">
                            <span>{item.title}</span>
                            <div className="flex items-center space-x-4">
                                <span>x{item.quantity}</span>
                                <span>{item.price * item.quantity}₽</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-6">
                    <span>Итого:</span>
                    <span>{total}₽</span>
                </div>

                <div className="flex space-x-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="+7 (___) ___-__-__"
                            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        заказать
                    </button>
                </div>
            </div>
        </div>
    )
}
