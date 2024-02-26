import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import Image from "next/image";
import { MdDangerous } from "react-icons/md";

const shoppingList = [
  { id: 1, name: "Apples", quantity: 2 },
  { id: 2, name: "Bread", quantity: 1 },
  { id: 3, name: "Milk", quantity: 1 },
  { id: 4, name: "Eggs", quantity: 12 },
  { id: 5, name: "Chicken Breast", quantity: 2 },
  { id: 6, name: "Rice", quantity: 1 },
  { id: 7, name: "Tomatoes", quantity: 4 },
];

const App = () => {
  const [groceryItem, setGroceryItem] = useState("");
  const [groceryList, setGroceryList] = useState(() => {
    const storedList = localStorage.getItem("groceryList");
    return storedList ? JSON.parse(storedList) : shoppingList;
  });

  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
  }, [groceryList]);

  const handleClick = (e) => {
    e.preventDefault();
    if (groceryItem === "") {
      alert("Lütfen en az bir ürün girin");
      return;
    }
    setGroceryList((prevlist) => [
      ...prevlist,
      {
        id: crypto.randomUUID(),
        name: groceryItem,
        quantity: 1,
        bought: false,
      },
    ]);
    setGroceryItem("");
  };

  const handleDeleteAll = () => {
    const isConfirmed = window.confirm(
      "Tüm listeyi silmek istediğinden emin misin?"
    );
    if (isConfirmed) {
      localStorage.removeItem("groceryList");
      setGroceryList([]);
    }
  };

  const handleDelete = (id) => {
    let newArr = groceryList.filter((item) => item.id !== id);
    setGroceryList(newArr);
  };

  const handleUpdate = (id) => {
    const updatedList = groceryList.map((item) => {
      if (item.id === id && !item.bought) {
        return { ...item, bought: true };
      } else if (item.id === id && item.bought) {
        return { ...item, bought: false };
      }
      return item;
    });
    setGroceryList(updatedList);
  };

  const handleIncrease = (id) => {
    const updatedQuantity = groceryList.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setGroceryList(updatedQuantity);
  };

  const handleDecrease = (id) => {
    const updatedQuantity = groceryList.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setGroceryList(updatedQuantity);
  };

  let totalNumberOfItem = groceryList.reduce(
    (total, item) => total + item.quantity,
    0
  );

  let message =
    groceryList.length > 0
      ? `Listende ${groceryList.length} kalem, toplam ${totalNumberOfItem} adet ürün var`
      : "Listende hiç ürün yok, hadi hemen ekle...";

  return (
    <div className="p-3">
      <div className="bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 mb-5">
        <div className="text-3xl font-bold text-center text-gray-800 p-2 mb-4">
          Alışveriş Listesi
        </div>
        <form className="flex justify-between" onSubmit={handleClick}>
          <input
            className="border p-2 w-full text-xl rounded-md shadow-sm font-light outline-none"
            type="text"
            placeholder="Neler alacaksın?"
            value={groceryItem}
            onChange={(e) => setGroceryItem(e.target.value)}
          />
          <button className="border p-4 ml-2 bg-[#3bbc7b] text-white rounded-md shadow-sm hover:bg-[#57E39E]">
            Ekle
          </button>
        </form>

        <div className="flex flex-col justify-center items-center">
          {groceryList.length === 0 && (
            <img
              src="https://i.ibb.co/C5Z9NPt/cart.png"
              alt="image"
              width={200}
              height={200}
              className="mt-10"
            />
          )}
          <p className="text-center p-2 font-light mt-2">{message}</p>
        </div>

        <ul>
          {groceryList.map((item) => {
            return (
              <li key={item.id}>
                <ListItem
                  groceryList={item}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                  handleIncrease={handleIncrease}
                  handleDecrease={handleDecrease}
                />
              </li>
            );
          })}
        </ul>
        {groceryList.length > 1 && (
          <div
            className="flex flex-row justify-center items-center  mt-5 cursor-pointer"
            onClick={handleDeleteAll}
          >
            <MdDangerous size={20} className="text-red-500" />
            <button className="p-2 font-light text-red-500">Tümünü Sil</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default App;
