
import { useState, useEffect, useReducer } from 'react';
import { reducer } from '../reducer'

const Node = (props) => {

    
    if (props.node.row === 0 && props.node.column === 0)
    {
        //console.log(props.node.isWall.toString())
        //console.log(props.node.isWall + "node "+props.node.row + " "+ props.node.column)    
    }
    const [node, setNode] = useState(props.node);
    
    const [color, setColor] = useState('#949599')//start white
    const [i, setI] = useState(props.node.row);
    const [j, setJ] = useState(props.node.column);
    const [state, dispatch] = useReducer(reducer);
    const [isWall, setIsWall] = useState(props.node.isWall);
    const [isStart, setIsStart] = useState(props.isStart);
    const [isEnd, setIsEnd] = useState(props.isEnd);
    const [cost, setCost] = useState(props.cost)
    
    //const [mouseDown, setMouseDown] = useState(false);
    //console.log(state.grid)
    //blueish #4f5157
    
    useEffect(() => {
        
        //console.log('in the effect')
        //setNode(node)
        if (props.node.isWall)
        {
           // console.log("is a wall")
            const newColor = '#4f5157';
            setColor(newColor);
        }
        else if (props.node.isStart)
        {
            const newColor = '#bba907';
            setColor(newColor);
        }
        else if (props.node.isEnd)
        {
            const newColor = '#5a1104';
            setColor(newColor);
        }
        else {
            const newColor = '#949599';
            setColor(newColor)
        }
    }, [props.node]);
    return (<>
        
        <div 
            
            onMouseEnter={() => props.onMouseEnter(i, j)}
            onMouseDown={() => props.onMouseDown(i, j)}
            onMouseUp = {() => props.onMouseUp()}
            className='node'
            style={ {backgroundColor: color}}>

            
        </div>
    
    </>)
}


export default Node;