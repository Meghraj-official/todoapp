import { Context, useContext, useState } from "react";
import { TodoType } from "../../configs/todo";
import EditIcon from "../Icons/EditIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import Button from "../Button/Button";
import { AddFormContext, AddFormContextType } from "../../App";
import { setDataToLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface TodoProps {
  todo: TodoType;
  setSelectedData: React.Dispatch<React.SetStateAction<TodoType | null>>;
}

const Todo: React.FC<TodoProps> = (props) => {
  const { todo, setSelectedData } = props;
  const { setTodos, todos } = useContext<AddFormContextType>(
    AddFormContext as Context<AddFormContextType>
  );

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked || !event.target.checked) {
      const newTodos: TodoType[] = todos?.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            status: event.target.checked ? "completed" : "incomplete",
          };
        }
        return item;
      });

      setTodos(newTodos);
      setDataToLocalStorage(newTodos);
      event.target.checked
        ? toast("Marked as completed")
        : toast("Marked as incomplete");
    }
  };

  const isChecked = todo.status === "completed" ? true : false;

  const handleDelete = () => {
    const newTodos = todos.filter((item) => item.id !== todo.id);
    setTodos(newTodos);
    setDataToLocalStorage(newTodos);
  };

  const handleEdit = () => {
    setSelectedData(todo);
  };

  return (
    <>
      <DeleteConfirmationModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        handleDelete={handleDelete}
      />
      <div className="flex items-center justify-between ">
        <div className="space-x-2 flex items-center cursor-pointer w-full">
          <input
            id={todo.id.toString()}
            type="checkbox"
            className="accent-blue-400 cursor-pointer"
            checked={isChecked}
            onChange={handleCheck}
          />
          <label
            htmlFor={todo?.id?.toString()}
            className={`${
              isChecked ? "line-through text-gray-400" : ""
            } cursor-pointer`}
          >
            {todo.title}
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            type="button"
            onClick={handleEdit}
            className="border-0 shadow-none !px-0"
          >
            <EditIcon />
          </Button>
          <Button
            type="button"
            onClick={() => setOpenDeleteModal(true)}
            className="border-0 shadow-none !px-0"
          >
            {" "}
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Todo;
