import React from 'react';

const Cart = ({ cartItems, onAdd, onRemove, total, onCheckout }) => {
  return (
    <div className="bg-neutral-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-neutral-100">Cart</h2>
      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-neutral-400">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.name} className="flex justify-between items-center bg-neutral-700 p-3 rounded-md text-neutral-100">
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm">Price: ${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => onRemove(item)}
                    className="bg-red-600 text-neutral-100 px-2 py-1 rounded-md hover:bg-red-500 transition"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onAdd(item)}
                    className="bg-green-600 text-neutral-100 px-2 py-1 rounded-md hover:bg-green-500 transition"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-sm font-semibold">Total: ${item.price * item.quantity}</p>
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
