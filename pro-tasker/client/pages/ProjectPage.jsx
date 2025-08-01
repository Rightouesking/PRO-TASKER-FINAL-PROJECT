import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const ProjectPage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get(`http://localhost:5000/api/projects/${id}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  const createTask = async () => {
    await axios.post(`http://localhost:5000/api/projects/${id}/tasks`, {
      title, description: desc
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTitle('');
    setDesc('');
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div>
      <h2>Project Tasks</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" />
      <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
      <button onClick={createTask}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title} – {task.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectPage;
