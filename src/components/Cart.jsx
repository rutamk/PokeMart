import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const Cart = ({ cartItems, onAdd, onRemove, total, onCheckout }) => {
  return (
    <div className="bg-neutral-900 p-4 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-neutral-100">Cart</h2>

      {/* Scrollable Cart Items */}
      <div 
        className="space-y-4 overflow-y-auto max-h-[690px] pr-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900"
      >
        {cartItems.length === 0 ? (
          <p className="text-neutral-400">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.name} className="flex justify-between items-center bg-neutral-800 px-3 py-2 rounded-md text-neutral-100">
              <div className="flex-1">
                <h3 className="text-lg font-semibold m-2">{item.name}</h3>
                <p className="text-sm m-2">Price: ${item.price}</p>
                <div className="flex items-center gap-5 mt-4 ml-2 mb-2">
                  <button
                    onClick={() => onRemove(item)}
                    className="bg-red-600 text-neutral-100 px-3 py-2 rounded-md hover:bg-red-500 transition"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onAdd(item)}
                    className="bg-green-600 text-neutral-100 px-3 py-2 rounded-md hover:bg-green-500 transition"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
                <p className="text-lg font-semibold ml-2 my-2">Total: ${item.price * item.quantity}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 text-lg font-semibold text-neutral-100">Total Price: ${total}</div>
      <button
        onClick={onCheckout}
        className="mt-6 bg-blue-600 text-neutral-100 px-4 py-2 rounded-lg hover:bg-blue-500 transition w-full text-center"
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
