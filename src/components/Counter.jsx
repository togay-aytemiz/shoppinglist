import { CiSquareMinus } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";

const Counter = ({ value, handleDecrease, handleIncrease }) => {
  const { id, name, quantity, bought } = value;

  const clickIncrese = () => {
    handleIncrease(id);
  };

  const clickDecrease = () => {
    handleDecrease(id);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      {quantity > 1 && <CiSquareMinus size={20} onClick={clickDecrease} />}
      <p className="font-light">{quantity}</p>
      <CiSquarePlus size={20} onClick={clickIncrese} />
    </div>
  );
};
export default Counter;
