import React, { createContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoComponents/TodoList";
import { TodoType } from "./configs/todo";
import { getDataFromLocalStorage } from "./utils/localStorage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FilterType = "all" | "completed" | "incomplete";

export interface AddFormContextType {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const AddFormContext = createContext<AddFormContextType | null>(null);

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchValue, setSearchValue] = useState<string>("");

  const value = {
    todos,
    setTodos,
    filter,
    setFilter,
    searchValue,
    setSearchValue,
  };

  useEffect(() => {
    const data = getDataFromLocalStorage();
    setTodos(data);
  }, []);

  return (
    <AddFormContext.Provider value={value}>
      <ToastContainer />
      <Header />
      <TodoList />
    </AddFormContext.Provider>
  );
}

export default App;
