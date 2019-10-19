import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import EmployeeStore from "./components/EmployeeStore";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <EmployeeStore/>
    </div>
  );
}

export default App;
