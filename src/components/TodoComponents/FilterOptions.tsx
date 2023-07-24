import { Context, useContext } from "react";
import { AddFormContext, AddFormContextType } from "../../App";
import { getDataFromLocalStorage } from "../../utils/localStorage";
import { TodoType } from "../../configs/todo";

const FilterOptions = () => {
  const { setFilter } = useContext<AddFormContextType>(
    AddFormContext as Context<AddFormContextType>
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      setFilter("all");
    } else if (e.target.value === "completed") {
      setFilter("completed");
    } else if (e.target.value === "incomplete") {
      setFilter("incomplete");
    }
  };

  return (
    <div className="text-gray-600 min-w-32">
      <select
        name="filter"
        id="filter"
        onChange={handleChange}
        className="w-full py-2 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};

export default FilterOptions;
