import { useDispatch } from "react-redux";
import { addNode } from "../utils/flowSlice";
import { FaRegFolder } from "react-icons/fa";

const GroupNode = () => {
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    dispatch(addNode({ type: "groupNode" }));
  };

  return (
    <div>
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-full transition duration-300 bg-slate-700 hover:bg-slate-900 text-white mb-5`}
        onClick={handleButtonClick}
      >
        <FaRegFolder />
      </button>
    </div>
  );
};

export default GroupNode;
