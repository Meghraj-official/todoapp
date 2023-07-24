import Todo from "./Todo";
import { TodoType } from "../../configs/todo";
import { Context, useContext, useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import { AddFormContext, AddFormContextType } from "../../App";

const TodoList: React.FC = () => {
  const [selectedData, setSelectedData] = useState<TodoType | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { filter, searchValue, todos } = useContext<AddFormContextType>(
    AddFormContext as Context<AddFormContextType>
  );
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>(() => todos);

  useEffect(() => {
    if (searchValue === "") {
      filter !== "all"
        ? setFilteredTodos(todos.filter((todo) => todo.status === filter))
        : setFilteredTodos(todos);
    }

    if (searchValue !== "") {
      const newTodosWithStatus =
        filter !== "all"
          ? todos.filter((todo) => todo.status === filter)
          : todos;
      const newTodos = newTodosWithStatus.filter((todo) =>
        todo.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredTodos(newTodos);
    }
  }, [searchValue, filter, todos]);

  return (
    <>
      <AddTodoForm
        openModal={selectedData ? true : openModal}
        setOpenModal={setOpenModal}
        type="edit"
        selectedData={selectedData as TodoType}
        setSelectedData={setSelectedData}
      />

      <div className="grid place-items-center mt-4 px-4">
        <div className="bg-white border border-gray-200 min-w-[365px] space-y-4 max-w-3xl w-full p-4 rounded-lg shadow-md">
          {filteredTodos && !filteredTodos[0] ? (
            <div className="h-16 grid place-items-center text-xl font-bold">
              No todos found
            </div>
          ) : (
            filteredTodos?.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  setSelectedData={setSelectedData}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default TodoList;