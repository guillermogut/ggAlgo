import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid'
import { useEffect, useReducer,useState } from 'react';
import { createStore } from 'redux';
import { reducer } from './reducer'
import Node from './components/Node'
import { breadth } from './algorithms/breadth';

const rows = 20;
const cols = 20;

const copyGrid = (grid) => {
  let newGrid = []

  grid.forEach((row) => {
    let newRow = []
    row.forEach((node) => {
      let newNode = { ...node }
      newRow.push(newNode)
    })
    row.push(newRow)
  })
  console.log(newGrid)
  return newGrid;
}
const makeNode = (row,column) =>{
    return {row,column,isWall: false,isStart:false,isEnd:false,cost:0, parentNode:null, visited:false,animate:''}

}

const initalizeGrid = () => {
  let grid = [];
  for (let i = 0; i < rows; i++){
    let row=[]
    
    for (let j = 0; j < cols; j++){
      row.push(makeNode(i, j));
    }
    grid.push(row);
  }

  return grid;
}
const reInitGrid = (grid) => {
  let newGrid = []
  for (let i = 0; i < rows; i++){
    
    
    for (let j = 0; j < cols; j++){
      
      grid[i][j].visited = false;
      
    }
    
  }

  return newGrid=[...grid]
}

//breadth();

function App() {
  
  //console.log('reeeee')
  //const [state,dispatch] = useReducer(reducer,defaultState)
  const [grid, setGrid] = useState(initalizeGrid());
  const [mouseDown, setMouseDown] = useState(false);
  const [start, setStart] = useState(false);
  const [startNode, setStartNode] = useState({});
  const [endNode, setEndNode] = useState({});
  const [end, setEnd] = useState(false);

  let savedGrid = null;
  let path = null;
  let visitedNodesOrdered = [];

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
      setStartNode(newNode);
      return newGrid;
    }
    if (end)
    {
      let node = grid[row][col];
  
      const newNode = { ...node };
      newNode.isWall = false;
      newNode.isStart = false;
      newNode.isEnd = true;
      let newGrid = [...grid];
      newGrid[row][col] = {...newNode};
      setEnd(false);
      setEndNode(newNode);
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
  const handleResetGrid = () =>{
    setGrid(initalizeGrid())
    setStartNode({});
    setEndNode({});
  }
  const handleBreadth = () => {

    
    savedGrid = [...grid];
    //returns path and nodes that were visited in order
    [path, visitedNodesOrdered] = breadth(grid, startNode, endNode);
    
    //console.log(visitedNodesOrdered)
    //return
    
    visitedNodesOrdered.forEach(node => {
      
      
      setTimeout(() => {

        let newGrid = [...grid]
        let newNode = { ...newGrid[node.row][node.column] }
        newNode.animate = 'visit';
        newGrid[node.row][node.column] = {...newNode}
        setGrid([...newGrid])
      }, 1000)
      
      

    })
    //reset nodes
    visitedNodesOrdered.forEach(node => {
      
      
      setTimeout(() => {

        let newGrid = [...grid]
        let newNode = { ...newGrid[node.row][node.column] }
        newNode.animate = false;
        newGrid[node.row][node.column] = {...newNode}
        setGrid([...newGrid])
      }, 1000)
      
      

    })

    //now render path
    path.forEach(node => {
      
      
      setTimeout(() => {

        let newGrid = [...grid]
        let newNode = { ...newGrid[node.row][node.column] }
        newNode.animate = 'path';
        newGrid[node.row][node.column] = {...newNode}
        setGrid([...newGrid])
      }, 1000)
      


    })

    const newGrid = [...savedGrid]
    setGrid(reInitGrid(newGrid))

    // setGrid(initalizeGrid())
    // setStartNode(startNode);
    // setEndNode(endNode);
    
    //breadth(grid,startNode,endNode)
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
    
  },[grid])
  //const gridArr = new Array(10).fill(new Array(10).fill(0));
  
  
  return (
    <div className="App" >
      
      <header className="App-header" onMouseUp={handleMouseUp} onMouseDown={() => handleMouseDown(-1,-1)} >
        
        <div className="rowContainer">
          <button type='button' onClick={() =>handlePlaceStart()}>Place Start Node</button>
          <button type='button' onClick={() => handlePlaceEnd()}>Place End Node</button>
          <button type ='button' onClick={()=>handleBreadth()}>BFS</button>
          <button type = 'button' onClick ={() => handleResetGrid()}>Reset</button>
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
                            key={colIndex}
                            onMouseEnter={(rowIndex, colIndex) => handleMouseEnter(rowIndex, colIndex)}
                            onMouseLeave={() => handleMouseLeave}
                            onMouseDown={(rowIndex, colIndex) => handleMouseDown(rowIndex, colIndex)}
                            onMouseUp={() => handleMouseUp()}
                            node={{ ...node }}
                            stl={!node.animate? 'node':'nodeAnimate'}>
                            
                            </Node>
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

const visualizeSearch = (path,visitedNodesOrdered) =>{

  console.log(path)
  console.log(visitedNodesOrdered)
}
export default App;
