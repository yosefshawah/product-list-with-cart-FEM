import styles from "./Cart.module.css";
import useCartStore from "../stores/cartStore";
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

// Define the store's type for cart items and actions
interface CartStore {
  cartItems: CartItem[];
  removeItem: (name: string) => void;
}

const Cart = () => {
  // Use explicit typing for the store
  const { cartItems, removeItem }: CartStore = useCartStore();

  const getTotalQuantity = (): number => {
    return cartItems.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0
    );
  };
  return (
    <div className={styles.cart}>
      <h1>Your Cart ({getTotalQuantity()})</h1>
      <ul className={styles.cartList}>
        {cartItems
          .filter((item) => item.quantity > 0) // Only include items with quantity > 0
          .map((item) => (
            <li className={styles.cartItem} key={item.name}>
              <div>
                <h2>{item.name}</h2>
                <span>
                  {item.quantity} x ${item.price} = $
                  {item.price * item.quantity}
                </span>
              </div>
              <img
                src="assets/images/icon-remove-item.svg"
                onClick={() => removeItem(item.name)}
              />
            </li>
          ))}
      </ul>

      {/* Order total section */}
      <div className={styles.orderTotal}>
        <span>Order Total</span>
        <span>
          $
          {cartItems
            .filter((item) => item.quantity > 0)
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </span>
      </div>

      {/* Carbon neutral */}
      <div className={styles.carbonNeutral}>
        <img src="assets/images/icon-carbon-neutral.svg" alt="" />
        <span>This is a carbon-neutral delivery</span>
      </div>

      {/* Confirm order button */}
      <button className={styles.orderBtn}>Confirm Order</button>
    </div>
  );
};

export default Cart;
