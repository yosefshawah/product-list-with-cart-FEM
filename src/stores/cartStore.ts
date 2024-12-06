import { create } from "zustand";
import { Product } from "../App";

// Define the type for the store state and actions
interface CartStore {
  cartItems: Product[]; // Array of cart items
  removeItem: (name: string) => void; // Action to remove an item
  addToCart: (product: Product) => void; // Action to add item to cart
  setCartItems: (items: Product[]) => void; // Action to set initial cart items
}

// Create the Zustand store
const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  removeItem: (name) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.name !== name),
    })),
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.name === product.name
      );
      if (existingItem) {
        // Update the quantity if the item already exists in the cart
        return {
          cartItems: state.cartItems.map((item) =>
            item.name === product.name
              ? { ...item, quantity: product.quantity }
              : item
          ),
        };
      } else {
        // Add new item to cart
        return { cartItems: [...state.cartItems, product] };
      }
    }),
  setCartItems: (items) => set({ cartItems: items }), // Set initial cart items
}));

export default useCartStore;
