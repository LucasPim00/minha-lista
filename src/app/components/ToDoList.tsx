'use client';
import { useState } from 'react';

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTask = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      title,
      description,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
  };

  const toggleComplete = (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const editTask = (index: number) => {
    const task = tasks[index];
    setTitle(task.title);
    setDescription(task.description);
    removeTask(index);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-white">
      <div className="bg-white rounded-xl p-5 shadow-md max-w-sm mx-auto">
        <h1 className="text-xl font-bold text-center text-black mb-4">
          Minha Lista de Tarefas
        </h1>

        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded text-black"
        />

        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded text-black resize-none"
        />

        <button
          onClick={addTask}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      <div className="mt-6 max-w-sm mx-auto space-y-4">
        {tasks
  .filter((task) => !task.completed)
  .map((task, index) => (
    <div
      key={index}
      className="bg-white text-black p-4 rounded-xl shadow flex flex-col gap-2"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold">{task.title}</h2>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <label className="flex items-center gap-1 text-sm">
          completar?
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(index)}
            className="accent-blue-600 scale-125"
          />
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => alert(`Visualizando: ${task.title}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
        >
          Visualizar
        </button>
        <button
          onClick={() => editTask(index)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-3 py-1 rounded"
        >
          Editar
        </button>
        <button
          onClick={() => removeTask(index)}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
        >
          Excluir
        </button>
      </div>
    </div>
        ))}

          {/* Tarefas Completas */}
          {tasks.some((task) => task.completed) && (
          <>
            <h2 className="text-center text-sm text-gray-400 mt-8 mb-2">Concluídas</h2>
        
            {tasks
              .filter((task) => task.completed)
              .map((task, index) => (
                <div
                  key={index}
                  className="bg-gray-100 text-black p-4 rounded-xl shadow flex flex-col gap-2 opacity-80"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-bold line-through">{task.title}</h2>
                      <p className="text-sm text-gray-500 line-through">
                        {task.description}
                      </p>
                    </div>
                    <label className="flex items-center gap-1 text-sm">
                      completar?
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(index)}
                        className="accent-blue-600 scale-125"
                      />
                    </label>
                  </div>
              
                  <div className="flex gap-2">
                    <button
                      onClick={() => editTask(index)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-3 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => removeTask(index)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}