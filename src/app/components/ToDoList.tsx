'use client';
import { useState } from 'react';

export default function ToDoList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, newTask]);
    setNewTask('');
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">Minha Lista de Tarefas</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-1 rounded text-black"
          placeholder="Digite uma tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 rounded" onClick={addTask}>
          Adicionar
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center mb-2 bg-gray-500 p-2 rounded">
            <span>{task}</span>
            <button onClick={() => removeTask(index)} className="text-red-500">Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}