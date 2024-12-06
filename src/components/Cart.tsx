import styles from "./Cart.module.css";
import useCartStore from "../stores/cartStore";
//git
const Cart = () => {
  const { cartItems, removeItem } = useCartStore();

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
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
                src="../src/assets/images/icon-remove-item.svg"
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
        <img src="../src/assets/images/icon-carbon-neutral.svg" alt="" />
        <span>This is a carbon-neutral delivery</span>
      </div>

      {/* Confirm order button */}
      <button className={styles.orderBtn}>Confirm Order</button>
    </div>
  );
};

export default Cart;
