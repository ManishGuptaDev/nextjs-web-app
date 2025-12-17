'use client';

import { useState, useEffect } from 'react';
import { Todo } from '@/lib/prisma';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Create todo
  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo }),
      });

      if (response.ok) {
        setNewTodo('');
        await fetchTodos();
      }
    } catch (error) {
      console.error('Failed to create todo:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle todo completion
  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });

      if (response.ok) {
        await fetchTodos();
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchTodos();
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">
          Todo App
        </h1>

        {/* Create Todo Form */}
        <form onSubmit={handleCreateTodo} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-50"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newTodo.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>

        {/* Todo List */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-zinc-500 dark:text-zinc-400 py-8">
              No todos yet. Add one to get started!
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id, todo.completed)}
                  className="w-5 h-5 rounded cursor-pointer"
                />
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? 'line-through text-zinc-500 dark:text-zinc-400'
                      : 'text-zinc-900 dark:text-zinc-50'
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
