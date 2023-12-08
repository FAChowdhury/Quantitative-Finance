import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import PageList from './Components/PageList';
import './App.css'

function App() {
  return (
    <Router>
      <PageList/>
    </Router>
  );
}

export default App;