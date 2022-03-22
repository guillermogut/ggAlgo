import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid'
import { useEffect, useReducer,useState } from 'react';
import { createStore } from 'redux';
import { reducer } from './reducer'
import Node from './components/Node'
import { breadth } from './algorithms/breadth';

const makeNode = (row,column) =>{
    return {row,column,isWall: false,isStart:false,isEnd:false,cost:1, parentNode:null}

}

const initalizeGrid = () => {
  let grid = [];
  for (let i = 0; i < 5; i++){
    let row=[]
    
    for (let j = 0; j < 5; j++){
      row.push(makeNode(i, j));
    }
    grid.push(row);
  }

  return grid;
}

//breadth();

function App() {
  //console.log('reeeee')
  //const [state,dispatch] = useReducer(reducer,defaultState)
  const [grid, setGrid] = useState(initalizeGrid());
  const [mouseDown, setMouseDown] = useState(false);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  
  const changeGrid = (grid,row,col) => {
    if (row === -1)
    {
      return null
    }
    //make sure to reset node isWall and isEnd as well
    if (start)
    {
      let node = grid[row][col];
  
      const newNode = { ...node };
      newNode.isWall = false;
      newNode.isStart = true;
      newNode.isEnd = false;
      let newGrid = [...grid]
      newGrid[row][col] = {...newNode};
      setStart(false);
      return newGrid;
    }
    if (end)
    {
      let node = grid[row][col];
  
      const newNode = { ...node };
      newNode.isWall = false;
      newNode.isStart = false;
      newNode.isEnd = true;
      let newGrid = [...grid]
      newGrid[row][col] = {...newNode};
      setEnd(false)
      return newGrid;
    }
  
  //let newGrid = grid.slice();
  
    let node = grid[row][col];
  
    const newNode = { ...node };
    newNode.isWall = !newNode.isWall;
    newNode.isEnd = false;
    newNode.isStart = false;
    let newGrid = [...grid]
    newGrid[row][col] = {...newNode};
  
  return newGrid;
  }
  
  const handleBreadth = ()=>{
      //breadth(grid,)
  }
  const handlePlaceStart = () => {
    setStart(!start);
  }
  const handlePlaceEnd = () => {
    setEnd(!end);
  }
  const handleMouseEnter = (row,col) => {
  //change color if mouse is down for node
    //console.log('mouse status: '+ mouseDown)
    
    if (!mouseDown) {
      //do nothing, just return
      //console.log('in mouseEnter mouse up')
      return
    }
    else {
      //console.log("in mouseEnter mouse down")
    //otherwise change the grid from top to bottom
    //const newGrid = changeGrid(grid, row, col);
    //setGrid(...changeGrid(grid, row, col));
      const newGrid = changeGrid(grid, row, col)
      if(newGrid === null) return
      setGrid([...newGrid]);
    }
    
  }

  const handleMouseLeave = (row, col) => {
  
  }

  const handleMouseUp = () => {
    //console.log('in handle mouse up')
    const changed = false;
    setMouseDown(changed);
    
  }

  const handleMouseDown = (row,col) => {
    
    
    //const newGrid = changeGrid(grid, row, col);
    if (row === -1) {//for testing handlMouseDown in another component
      //console.log('in handle mouse down '+ row)
      //console.log(row)
      const changed = true;
      setMouseDown(changed)
      
    }
    else {
      const changed = true;
    
      setMouseDown(changed)

    }
    
    const newGrid = changeGrid(grid, row, col)
    if(newGrid === null) return
    setGrid([...newGrid]);
  }


  useEffect(() => {
    //console.log(grid.length)
    //setGrid(initalizeGrid());
    
    //console.log("mousedown: "+mouseDown)
  },[])
  //const gridArr = new Array(10).fill(new Array(10).fill(0));
  
  
  return (
    <div className="App" >
      
      <header className="App-header" onMouseUp={handleMouseUp} onMouseDown={() => handleMouseDown(-1,-1)} >
        
        <div className="rowContainer">
          <button type='button' onClick={() =>handlePlaceStart()}>Place Start Node</button>
          <button type='button' onClick={() => handlePlaceEnd()}>Place End Node</button>
          <button type ='button' onClick={()=>handleBreadth()}>BFS</button>
        </div>
        {

          
          grid.map((rows, rowIndex) => {
            
            return (
              <div className='gridRow' key = {rowIndex}>

                {
                  rows.map((node, colIndex) => {
                    return (
                      <div key={colIndex}>
                        
                        {
                          <Node 
                            key ={colIndex}
                            onMouseEnter={(rowIndex,colIndex) => handleMouseEnter(rowIndex,colIndex)}
                            onMouseLeave ={() => handleMouseLeave}
                            onMouseDown={(rowIndex,colIndex) => handleMouseDown(rowIndex,colIndex)}
                            onMouseUp={() =>handleMouseUp()}
                            node={{...node}}></Node>
                        }
                      </div>
                    )
                        })


                  
                }

              </div>

            )
            
          })
          
        }
        {/* { console.log(grid)} */}
      </header>
    </div>
  );
}

export default App;
