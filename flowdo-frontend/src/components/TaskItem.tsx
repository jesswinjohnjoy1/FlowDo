import { useState } from "react";
import api from "../services/api";
import type { Task } from "../types/Task";

interface TaskItemProps {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (taskId: number) => void;
}

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [loading, setLoading] = useState(false);


  const handleToggleComplete = async () => {
    try {
      setLoading(true);
      const response = await api.patch(`tasks/${task.id}/`, {
        is_completed: !task.is_completed,
      });
      onTaskUpdated(response.data);
    } catch {
      console.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };
 
  const handleSaveTitle = async () => {
    try {
      setLoading(true);
      const response = await api.patch(`tasks/${task.id}/`, {
        title: taskTitle,
      });
      onTaskUpdated(response.data);
      setIsEditing(false);
    } catch {
      console.error("Failed to edit task");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      setLoading(true);
      await api.delete(`tasks/${task.id}/delete/`);
      onTaskDeleted(task.id);
    } catch {
      console.error("Failed to delete task");
      alert("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.is_completed}
        onChange={handleToggleComplete}
        disabled={loading}
      />

      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <button className="save-btn" onClick={handleSaveTitle} disabled={loading}>
            Save
          </button>
        </>
      ) : (
        <>
          <span className={task.is_completed ? "completed" : ""}>
            {task.title}
          </span>
          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
            disabled={loading}
          >
            Edit
          </button>
          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
