'use client';

import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  order: number;
}

interface Resource {
  id: string;
  title: string;
  url: string | null;
  type: string;
  description: string | null;
}

interface Day {
  id: string;
  notes: string | null;
  completed: boolean;
  tasks: Task[];
  resources: Resource[];
}

export default function DayContent({ day: initialDay }: { day: Day }) {
  const [day, setDay] = useState(initialDay);
  const [notes, setNotes] = useState(day.notes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const toggleTask = async (taskId: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setDay(prev => ({
          ...prev,
          tasks: prev.tasks.map(t => 
            t.id === taskId ? { ...t, completed: updatedTask.completed } : t
          ),
        }));
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const saveNotes = async () => {
    setIsSavingNotes(true);
    try {
      const response = await fetch(`/api/day/${day.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });

      if (response.ok) {
        const updatedDay = await response.json();
        setDay(prev => ({ ...prev, notes: updatedDay.notes }));
      }
    } catch (error) {
      console.error('Failed to save notes:', error);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const toggleDayComplete = async () => {
    try {
      const response = await fetch(`/api/day/${day.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !day.completed }),
      });

      if (response.ok) {
        const updatedDay = await response.json();
        setDay(prev => ({ ...prev, completed: updatedDay.completed }));
      }
    } catch (error) {
      console.error('Failed to update day:', error);
    }
  };

  const completedTasks = day.tasks.filter(t => t.completed).length;
  const totalTasks = day.tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Progress</h2>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
          <div
            className="bg-blue-600 dark:bg-blue-400 h-4 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button
          onClick={toggleDayComplete}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            day.completed
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {day.completed ? '✓ Day Completed' : 'Mark Day as Complete'}
        </button>
      </div>

      {/* Tasks Checklist */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        {day.tasks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No tasks for this day.</p>
        ) : (
          <div className="space-y-3">
            {day.tasks.map((task) => (
              <label
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => toggleTask(task.id, e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span
                    className={`block ${
                      task.completed
                        ? 'line-through text-gray-500 dark:text-gray-500'
                        : ''
                    }`}
                  >
                    {task.title}
                  </span>
                  {task.description && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {task.description}
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your notes here..."
          className="w-full min-h-[200px] p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={saveNotes}
          disabled={isSavingNotes}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
        >
          {isSavingNotes ? 'Saving...' : 'Save Notes'}
        </button>
      </div>

      {/* Resources */}
      {day.resources.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Resources</h2>
          <div className="space-y-3">
            {day.resources.map((resource) => (
              <div
                key={resource.id}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{resource.title}</h3>
                    {resource.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {resource.description}
                      </p>
                    )}
                    <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {resource.type}
                    </span>
                  </div>
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Open →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
