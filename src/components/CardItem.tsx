import React, { useEffect, useState } from "react";
import styles from "./CardItem.module.css";
import useCartStore from "../stores/cartStore"; // Import the store

// Props type for CardItem
interface CardItemProps {
  product: {
    image: {
      desktop: string;
    };
    name: string;
    price: number;
    category: string;
  };
  className?: string;
}

const CardItem: React.FC<CardItemProps> = ({ product }) => {
  const [hovered, setHovered] = useState(false); // Track hover state
  const [quantity, setQuantity] = useState(0); // Track item quantity
  const { addToCart } = useCartStore(); // Use the store's action

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 0)); // Ensure no negative values

  // Trigger add to cart when quantity or product changes
  useEffect(() => {
    if (quantity > 0) {
      addToCart({ ...product, quantity }); // Add product with quantity to the cart
    }
  }, [quantity, product, addToCart]); // Dependencies: re-run when quantity or product changes

  return (
    <div className={styles.item}>
      <div className="item-div row">
        <img src={product.image.desktop} alt={product.name} />
        <button
          onMouseEnter={() => setHovered(true)} // On hover, change content
          onMouseLeave={() => setHovered(false)} // Reset content when hover ends
          className={`${styles.button} ${hovered ? styles.hoveredButton : ""}`}
        >
          {hovered ? (
            // Render content for hover state
            <div className={styles.hoverContent}>
              <img
                onClick={decrement}
                src="/assets/images/icon-decrement-quantity.svg"
                alt="Decrement"
              />
              <span className={styles.amount}>{quantity}</span>
              <img
                onClick={increment}
                src="/assets/images/icon-increment-quantity.svg"
                alt="Increment"
              />
            </div>
          ) : (
            // Render default content
            <span>
              <img
                src="/assets/images/icon-add-to-cart.svg"
                alt="Add to cart icon"
              />
              Add to Cart
            </span>
          )}
        </button>
      </div>
      <h2 className={styles.h2}>{product.name}</h2>
      <p style={{ color: "#924729" }}>${product.price.toFixed(2)}</p>
    </div>
  );
};

export default CardItem;
