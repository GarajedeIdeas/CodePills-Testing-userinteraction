import './App.css';
import Formulario from './components/Formulario';
import { useState } from 'react';
import ListaTareas from './components/ListaTareas';

function App() {

  const [tasks, setTasks] = useState([]);

  const onCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="App">
      <Formulario createTask={onCreateTask} />
      <ListaTareas tasks={tasks} />
    </div>
  );
}

export default App;
