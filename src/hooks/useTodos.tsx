import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

const fetchInitialTodos = async (): Promise<Todo[]> => {
  const response = await fetch("https://dummyjson.com/todos?limit=5");
  const data = await response.json();
  return data.todos;
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const { data: initialTodos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchInitialTodos,
  });

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else if (initialTodos) {
      setTodos(initialTodos);
    }
  }, [initialTodos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      todo: text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};