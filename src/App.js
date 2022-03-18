import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid'
import { useEffect, useReducer,useState } from 'react';
import { createStore } from 'redux';
import { reducer } from './reducer'

let rows = 10;
let cols = 10;
let defaultState = {
  grid: new Array(rows).fill(new Array(cols).fill(0)),
  select: false,
  setWall: false
}
function App() {

  const [state,dispatch] = useReducer(reducer,defaultState)
  
  useEffect(() => {
    console.log(state.grid)
    setTimeout(function () {
      dispatch({type:'ree', payload:{i:5,j:5}})
    }, 2000);
    console.log(state.grid)
  },[])
  //const gridArr = new Array(10).fill(new Array(10).fill(0));
  
  
  return (
    <div className="App">
      <header className="App-header">
        <Grid grid={state.grid}></Grid>
      </header>
    </div>
  );
}

export default App;
