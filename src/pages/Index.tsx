import { useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import TodoItem from "@/components/TodoItem";
import AddTodo from "@/components/AddTodo";
import TodoFilter from "@/components/TodoFilter";
import { Skeleton } from "@/components/ui/skeleton";

type FilterType = "all" | "active" | "completed";

const Index = () => {
  const { todos, isLoading, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo List</h1>
          <p className="text-gray-600">Stay organized and get things done</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <AddTodo onAdd={addTodo} />
        </div>

        <div className="mb-4">
          <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        </div>

        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))
          ) : filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No tasks found. Add some tasks to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;