import React from 'react';
import './App.css';
import './../src/scss/index.scss'
import 'semantic-ui-css/semantic.min.css'
import Main from './../src/components/Main'
import PopUpAddTeam from './components/common/PopUpAddTeam'
import PopUpAddBoard from './components/common/PopUpAddBoard'

function App() {
  return (
    // <Main />
    <PopUpAddBoard />
  );
}

export default App;
