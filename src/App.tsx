import React from "react";
import "./App.css";
import CardItem from "./components/CardItem";
import Cart from "./components/Cart";
import data from "./data.json";
import useCartStore from "./stores/cartStore";

// Define the Product type
export type Product = {
  image: {
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
  quantity: number;
};
// Preprocess the products to fix image paths
const products: Product[] = data.map((item) => ({
  ...item,
  quantity: 0,
  image: Object.keys(item.image).reduce((acc, key) => {
    acc[key as keyof Product["image"]] = `../public/${
      item.image[key as keyof Product["image"]]
    }`;
    return acc;
  }, {} as Product["image"]),
}));

function App() {
  const { setCartItems } = useCartStore();

  React.useEffect(() => {
    setCartItems(products); // Populate cartItems with products
  }, [setCartItems, products]);

  return (
    <>
      <main className="row">
        <div className="wrapper">
          <h1>Desserts</h1>
          <div className="card-list">
            {products.map((item, index) => (
              <CardItem key={index} product={item} />
            ))}
          </div>
        </div>
        <Cart />
      </main>
    </>
  );
}

export default App;
