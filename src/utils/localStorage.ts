import { TodoType } from "../configs/todo";

export const setDataToLocalStorage = (data: TodoType[]) => {
  localStorage.setItem("todo", JSON.stringify(data));
};

export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem("todo");
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
