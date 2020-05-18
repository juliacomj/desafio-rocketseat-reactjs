import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories ] = useState([]);
    useEffect(() => {
        api.get('repositories').then(response => {
          setRepositories(response.data);
        });
    }, [])

  async function handleAddRepository() {
   const response = await api.post('repositories', {
      title: `teste ${Date.now()}`,
      url: "nome",
      techs: ["node", "react"]
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
     await api.delete(`repositories/${id}`);
     const repositoryIndex = repositories.findIndex(item => item.id = id);
     repositories.splice(repositoryIndex,1);
     setRepositories([...repositories]);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(item => <li key={item.id}>
          {item.title}
          <button onClick={() => handleRemoveRepository(item.id)}>Remover</button>
          </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
