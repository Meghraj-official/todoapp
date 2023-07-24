import { useState } from "react";
import Button from "../Button/Button";
import AddTodoForm from "../TodoComponents/AddTodoForm";
import FilterOptions from "../TodoComponents/FilterOptions";
import SearchBar from "../TodoComponents/SearchBar";

const Header: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleAddTodo = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <AddTodoForm
        setOpenModal={setOpenModal}
        openModal={openModal}
        type="add"
      />
      <div className="bg-blue-400 text-white">
        <div className="max-w-7xl px-4 md:px-10 xl:px-0 mx-auto py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">Todo List</h1>

          <div className="space-x-4 flex">
            <FilterOptions />
            <SearchBar />
          </div>
          <Button type="button" onClick={handleAddTodo} className="">
            Add Todo
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
