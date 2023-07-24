import { AddFormContext, AddFormContextType } from "../../App";
import { Context, useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import { setDataToLocalStorage } from "../../utils/localStorage";
import { TodoType } from "../../configs/todo";
import { toast } from "react-toastify";

interface AddTodoFormProps {
  type: "add" | "edit";
  selectedData?: TodoType;
  setSelectedData?: React.Dispatch<React.SetStateAction<TodoType | null>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTodoForm: React.FC<AddTodoFormProps> = (props) => {
  const { type, selectedData, setSelectedData, openModal, setOpenModal } =
    props;
  const { setTodos, todos } = useContext<AddFormContextType>(
    AddFormContext as Context<AddFormContextType>
  );

  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (type === "edit") {
      setValue(selectedData?.title || "");
    }
    if (type === "add") {
      setValue("");
    }
  }, [selectedData, type]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "edit") {
      const newTodos = todos.map((todo) => {
        if (todo.id === selectedData?.id) {
          return {
            ...todo,
            title: value,
          };
        }
        return todo;
      });
      setTodos(newTodos);
      setDataToLocalStorage(newTodos);
      toast.success("Todo updated successfully");
    } else {
      const newTodo: TodoType = {
        id: Math.random(),
        title: value,
        status: "incomplete",
      };
      setTodos((prev: TodoType[]) => [...prev, newTodo]);
      setDataToLocalStorage([...todos, newTodo]);
      toast.success("Todo added successfully");
    }

    setValue("");
    closeModal();
    setSelectedData && setSelectedData(null);
  };
  return (
    <>
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-brightness-50 ${
          openModal ? "block bg-red-500" : "hidden "
        }}`}
      >
        <div className="relative w-full max-w-md max-h-full mx-auto md:mt-10">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow px-4 py-4">
            <div className="flex items-center justify-between ">
              <div className="text-xl font-bold">Add New Todo</div>
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="w-full mt-4">
              <form onSubmit={handleSubmit}>
                <label htmlFor="title" className="text-gray-500">
                  Todo Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="border py-1 px-4 rounded-md w-full mt-1"
                  placeholder="Add new todo"
                  value={value}
                  onChange={handleChange}
                  required
                />
                <div className="flex justify-center ">
                  <Button type="submit" className="mt-4 bg-blue-400 text-white">
                    {type === "add" ? "Add Todo" : "Update Todo"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTodoForm;
