import { RiDeleteBinLine } from "react-icons/ri";
import Counter from "./Counter";

const style = {
  item: `flex justify-betweencapitalize rounded ml-2 cursor-pointer`,
  boughtItem: `flex justify-betweencapitalize rounded ml-2 line-through cursor-pointer `,
  divItem: `opacity-100 flex`,
  boughtDivItem: `opacity-30 flex`,
};

const ListItem = ({
  groceryList,
  onDelete,
  onUpdate,
  handleIncrease,
  handleDecrease,
}) => {
  const { id, name, quantity, bought } = groceryList;

  const handleDelete = () => {
    onDelete(id);
  };

  const handleUpdate = () => {
    onUpdate(id);
  };

  return (
    <div className=" bg-white p-3 my-2 flex shadow items-center justify-between ">
      <div
        className={bought ? style.boughtDivItem : style.divItem}
        onClick={handleUpdate}
      >
        <input type="checkbox" checked={bought} />
        <p className={bought ? style.boughtItem : style.item}>{name}</p>
      </div>
      <div className="flex flex-row justify-center items-center">
        <Counter
          value={groceryList}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
        />
        <button onClick={handleDelete} className="ml-4">
          <RiDeleteBinLine size={18} className="text-red-500" />
        </button>
      </div>
    </div>
  );
};
export default ListItem;
