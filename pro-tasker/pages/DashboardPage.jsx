import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchProjects = async () => {
    const res = await axios.get('http://localhost:5000/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProjects(res.data);
  };

  const createProject = async () => {
    await axios.post('http://localhost:5000/api/projects', { name, description }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setName('');
    setDescription('');
    fetchProjects();
  };

  useEffect(() => { fetchProjects(); }, []);

  return (
    <div>
      <h2>Your Projects</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button onClick={createProject}>Create</button>

      <ul>
        {projects.map(p => (
          <li key={p._id}>
            <Link to={`/project/${p._id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
