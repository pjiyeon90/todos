import React,{useEffect} from 'react'
import axios from 'axios'
import './App.css';
import store from './state/store';

import './asset/css/todos.scss'
import Insert from './component/Insert';
import List from './component/List';
import Sort from './component/Sort';

function App() {



  return (
    <div className='todolist'>
      <h2>Todo List</h2>
      <div className='wrap'>
       <Insert/>
        <List/>
        <Sort/>
      </div>
    </div>
  );
}

export default App;
